import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import ChallengeArena from '../components/ChallengeArena';
import Button from '../components/Button';
import LevelListItem from '../components/LevelListItem';
import { useProgressStore } from '../store/progressStore';
import { validateChallenge } from '../utils/challengeValidator';
import { Challenge } from '../types/challenge';

const ModulePage: React.FC = () => {
  const { moduleName } = useParams<{ moduleName: string }>();
  const navigate = useNavigate();
  const iframeWindowRef = useRef<Window | null>(null);

  const {
    modules,
    activeModule,
    activeLevelIndex,
    userProgress,
    setActiveModule,
    setActiveLevelIndex,
    updateUserCode,
    markLevelCompleted,
  } = useProgressStore();

  const currentModuleChallenges = moduleName ? modules[moduleName] : undefined;
  const currentChallenge: Challenge | undefined = currentModuleChallenges?.[activeLevelIndex];

  const [userCss, setUserCss] = useState<string>('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  // Effect to set active module and level when component mounts or moduleName changes
  useEffect(() => {
    if (moduleName && modules[moduleName]) {
      setActiveModule(moduleName);
      // Find the first incomplete level or default to 0
      const firstIncompleteIndex = modules[moduleName].findIndex(
        (challenge, idx) => !(userProgress[moduleName]?.[challenge.id]?.completed)
      );
      setActiveLevelIndex(firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0);
    } else if (!moduleName) {
      navigate('/'); // Redirect to map if no module name
    } else {
      navigate('/404'); // Redirect to 404 if module not found
    }
  }, [moduleName, modules, setActiveModule, setActiveLevelIndex, userProgress, navigate]);

  // Effect to load user's saved code or starter code for the current challenge
  useEffect(() => {
    if (currentChallenge) {
      const savedCode = userProgress[moduleName!]?.[currentChallenge.id]?.userCode;
      const completed = userProgress[moduleName!]?.[currentChallenge.id]?.completed || false;
      setUserCss(savedCode || currentChallenge.cssStarter);
      setIsChallengeCompleted(completed);
      setFeedback(null);
    }
  }, [currentChallenge, moduleName, userProgress]);

  // Callback for CodeMirror changes
  const handleCodeChange = useCallback((value: string) => {
    setUserCss(value);
    if (currentChallenge) {
      updateUserCode(moduleName!, currentChallenge.id, value);
    }
    setFeedback(null); // Clear feedback on code change
    setIsChallengeCompleted(false); // Mark as incomplete if code changes
  }, [currentChallenge, moduleName, updateUserCode]);

  // Callback for iframe load
  const handleIframeLoad = useCallback((iframeWindow: Window | null) => {
    iframeWindowRef.current = iframeWindow;
  }, []);

  // Validation logic
  const handleValidate = useCallback(() => {
    if (!currentChallenge || !iframeWindowRef.current) {
      setFeedback({ message: 'Error: Challenge or arena not ready.', type: 'error' });
      return;
    }

    try {
      const isValid = validateChallenge(
        iframeWindowRef.current,
        userCss,
        currentChallenge.solution
      );

      if (isValid) {
        setFeedback({ message: 'Success! Challenge completed!', type: 'success' });
        markLevelCompleted(moduleName!, currentChallenge.id);
        setIsChallengeCompleted(true);
      } else {
        setFeedback({ message: 'Keep trying! Your CSS is not quite right yet.', type: 'error' });
      }
    } catch (error) {
      console.error("Validation error:", error);
      setFeedback({ message: `Validation failed: ${(error as Error).message}`, type: 'error' });
    }
  }, [currentChallenge, userCss, moduleName, markLevelCompleted]);

  const handleNextLevel = useCallback(() => {
    if (currentModuleChallenges && activeLevelIndex < currentModuleChallenges.length - 1) {
      setActiveLevelIndex(activeLevelIndex + 1);
    } else {
      setFeedback({ message: 'You have completed all levels in this module!', type: 'info' });
      // Optionally navigate back to map or show completion message
      // navigate('/');
    }
  }, [currentModuleChallenges, activeLevelIndex, setActiveLevelIndex]);

  const handlePrevLevel = useCallback(() => {
    if (activeLevelIndex > 0) {
      setActiveLevelIndex(activeLevelIndex - 1);
    }
  }, [activeLevelIndex, setActiveLevelIndex]);

  if (!currentModuleChallenges || !currentChallenge) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-text-light">
        Loading module or module not found...
      </div>
    );
  }

  const moduleTitles: { [key: string]: string } = {
    'selectors': 'The Selector Garden',
    'box-model': 'The Box Model Citadel',
    'color-text': 'The Color & Text Palace',
    'flexbox': 'The Flexbox Fleet',
    'grid': 'The Grid Kingdom',
    'positioning': 'The Positioning Peak',
    'transitions-animations': 'The Transition & Animation Volcano',
  };

  return (
    <div className="flex h-screen bg-background text-text">
      {/* Left Sidebar: Module Info & Level List */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-gray-800 p-6 flex flex-col shadow-lg"
      >
        <h2 className="text-3xl font-bold text-primary mb-6 border-b border-gray-700 pb-4">
          {moduleTitles[moduleName!] || moduleName}
        </h2>
        <div className="flex-grow overflow-y-auto pr-2">
          <ul className="space-y-3">
            {currentModuleChallenges.map((challenge, index) => (
              <LevelListItem
                key={challenge.id}
                levelIndex={index}
                title={challenge.title}
                isCompleted={userProgress[moduleName!]?.[challenge.id]?.completed || false}
                isActive={index === activeLevelIndex}
                onClick={setActiveLevelIndex}
              />
            ))}
          </ul>
        </div>
        <Button onClick={() => navigate('/')} variant="outline" className="mt-6 w-full">
          Back to Map
        </Button>
      </motion.div>

      {/* Main Content Area: Instructions, Arena, Editor */}
      <div className="flex-grow grid grid-cols-2 grid-rows-[auto_1fr] gap-6 p-6">
        {/* Top Row: Instructions & Feedback */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-2 bg-gray-800 p-6 rounded-lg shadow-md flex flex-col"
        >
          <h3 className="text-2xl font-semibold text-white mb-3">{currentChallenge.title}</h3>
          <p className="text-text-light mb-4 flex-grow">{currentChallenge.instruction}</p>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-md text-sm font-medium
                ${feedback.type === 'success' ? 'bg-success/20 text-success' : ''}
                ${feedback.type === 'error' ? 'bg-error/20 text-error' : ''}
                ${feedback.type === 'info' ? 'bg-primary/20 text-primary' : ''}
              `}
            >
              {feedback.message}
            </motion.div>
          )}
          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevLevel} disabled={activeLevelIndex === 0} variant="outline">
              Previous Level
            </Button>
            <Button onClick={handleValidate} variant={isChallengeCompleted ? 'success' : 'primary'}>
              {isChallengeCompleted ? 'Completed!' : 'Check CSS'}
            </Button>
            <Button onClick={handleNextLevel} disabled={activeLevelIndex === currentModuleChallenges.length - 1 && isChallengeCompleted} variant="outline">
              Next Level
            </Button>
          </div>
        </motion.div>

        {/* Bottom Row: Arena & Editor */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 bg-gray-800 p-4 rounded-lg shadow-md flex flex-col"
        >
          <h4 className="text-xl font-semibold text-white mb-3">Visual Arena</h4>
          <ChallengeArena
            htmlContent={currentChallenge.html}
            cssContent={userCss}
            onIframeLoad={handleIframeLoad}
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 bg-gray-800 p-4 rounded-lg shadow-md flex flex-col"
        >
          <h4 className="text-xl font-semibold text-white mb-3">CSS Editor</h4>
          <CodeEditor value={userCss} onChange={handleCodeChange} />
        </motion.div>
      </div>
    </div>
  );
};

export default ModulePage;
