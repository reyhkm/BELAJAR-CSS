import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/stores/progressStore';
import VisualArena from '@/components/VisualArena';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { validateCss } from '@/lib/validation';
import { Check, X, ArrowRight } from 'lucide-react';

const ModulePage = () => {
  const { moduleName } = useParams<{ moduleName: string }>();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const {
    modules,
    activeLevelIndex,
    userCode,
    setActiveModuleAndLevel,
    setUserCode,
    completeLevel,
    goToNextLevel,
  } = useProgressStore((state) => ({
    modules: state.modules,
    activeLevelIndex: state.activeLevelIndex,
    userCode: state.userProgress[state.activeModule]?.[state.activeLevelIndex] || '',
    setActiveModuleAndLevel: state.setActiveModuleAndLevel,
    setUserCode: state.setUserCode,
    completeLevel: state.completeLevel,
    goToNextLevel: state.goToNextLevel,
  }));

  useEffect(() => {
    if (moduleName) {
      setActiveModuleAndLevel(moduleName, 0);
    }
  }, [moduleName, setActiveModuleAndLevel]);

  const module = moduleName ? modules[moduleName] : null;
  const level = module ? module.challenges[activeLevelIndex] : null;

  if (!module || !level) {
    return <div className="text-center p-8">Loading challenge or module not found...</div>;
  }

  const handleCodeChange = (value: string) => {
    setUserCode(value);
    setFeedback(null);
  };

  const handleCheck = () => {
    if (iframeRef.current && level.solution) {
      const isCorrect = validateCss(iframeRef.current, level.solution);
      if (isCorrect) {
        setFeedback('correct');
        completeLevel();
        setTimeout(() => {
          if (activeLevelIndex < module.challenges.length - 1) {
            goToNextLevel();
            setFeedback(null);
          } else {
            // Last level completed
            alert('Selamat! Kamu telah menyelesaikan dunia ini!');
            navigate('/');
          }
        }, 1500);
      } else {
        setFeedback('incorrect');
      }
    }
  };

  const currentCode = userCode || level.cssStarter;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-64px)]">
      {/* Left: Instructions */}
      <div className="lg:col-span-3 bg-brand-primary p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-brand-accent mb-4">{module.name}</h1>
        <h2 className="text-xl font-semibold mb-2">{level.title}</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{level.instruction}</p>
      </div>

      {/* Middle: Visual Arena */}
      <div className="lg:col-span-5 bg-gray-200 p-4 flex items-center justify-center">
        <VisualArena 
          iframeRef={iframeRef} 
          htmlContent={level.html} 
          cssContent={currentCode} 
        />
      </div>

      {/* Right: Code Editor */}
      <div className="lg:col-span-4 bg-[#1e1e1e] flex flex-col">
        <div className="flex-grow overflow-hidden">
          <CodeMirror
            value={currentCode}
            height="100%"
            extensions={[css()]}
            onChange={handleCodeChange}
            theme="dark"
          />
        </div>
        <div className="p-4 bg-brand-secondary flex justify-end items-center gap-4">
          {feedback === 'correct' && <div className="flex items-center gap-2 text-green-400"><Check /> Benar!</div>}
          {feedback === 'incorrect' && <div className="flex items-center gap-2 text-red-400"><X /> Coba lagi!</div>}
          <button 
            onClick={handleCheck}
            className="bg-brand-accent text-white font-bold py-2 px-6 rounded hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            Check Answer <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
