import React from 'react';
import { motion } from 'framer-motion';
import ModuleCard from '../components/ModuleCard';
import ProgressBar from '../components/ProgressBar';
import { useProgressStore } from '../store/progressStore';

const MapPage: React.FC = () => {
  const { modules, userProgress, moduleOrder } = useProgressStore();

  const totalLevels = Object.values(modules).reduce((acc, module) => acc + module.length, 0);
  const completedLevels = Object.values(userProgress).reduce((acc, moduleLevels) => {
    return acc + Object.values(moduleLevels).filter(level => level.completed).length;
  }, 0);

  const overallProgress = totalLevels > 0 ? completedLevels / totalLevels : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg"
      >
        CSS Quest Worlds
      </motion.h1>

      <div className="w-full max-w-4xl mb-12">
        <ProgressBar progress={overallProgress} label="Overall Progress" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {moduleOrder.map((moduleName, index) => {
          const moduleData = modules[moduleName];
          if (!moduleData) return null;

          const moduleLevelsProgress = userProgress[moduleName] || {};
          const moduleCompletedLevels = Object.values(moduleLevelsProgress).filter(level => level.completed).length;
          const moduleProgress = moduleData.length > 0 ? moduleCompletedLevels / moduleData.length : 0;

          // Unlock logic: first module is always unlocked, subsequent modules unlock if previous is 100% complete
          const isUnlocked = index === 0 || (index > 0 && moduleOrder[index - 1] && 
            (Object.values(userProgress[moduleOrder[index - 1]] || {}).filter(level => level.completed).length === modules[moduleOrder[index - 1]].length));

          const moduleTitles: { [key: string]: string } = {
            'selectors': 'The Selector Garden',
            'box-model': 'The Box Model Citadel',
            'color-text': 'The Color & Text Palace',
            'flexbox': 'The Flexbox Fleet',
            'grid': 'The Grid Kingdom',
            'positioning': 'The Positioning Peak',
            'transitions-animations': 'The Transition & Animation Volcano',
          };

          const moduleDescriptions: { [key: string]: string } = {
            'selectors': 'Master the art of targeting HTML elements with precision.',
            'box-model': 'Unravel the mysteries of element dimensions, padding, borders, and margins.',
            'color-text': 'Bring your designs to life with vibrant colors and expressive typography.',
            'flexbox': 'Arrange elements effortlessly with the power of one-dimensional layouts.',
            'grid': 'Build complex, responsive layouts with the ultimate two-dimensional grid system.',
            'positioning': 'Control the exact placement of elements on the page, from static to sticky.',
            'transitions-animations': 'Add smooth motion and dynamic effects to your web elements.',
          };

          return (
            <ModuleCard
              key={moduleName}
              moduleName={moduleName}
              title={moduleTitles[moduleName] || moduleName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              description={moduleDescriptions[moduleName] || 'Explore fundamental CSS concepts.'}
              image={`/assets/modules/${moduleName}.png`}
              isUnlocked={isUnlocked}
              progress={moduleProgress}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default MapPage;
