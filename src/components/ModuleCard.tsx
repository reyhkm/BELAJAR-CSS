import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  moduleName: string;
  title: string;
  description: string;
  image: string;
  isUnlocked: boolean;
  progress: number; // e.g., 0.75 for 75% completed
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  moduleName,
  title,
  description,
  image,
  isUnlocked,
  progress,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative rounded-lg shadow-xl overflow-hidden transition-all duration-300
        ${isUnlocked ? 'bg-gray-800 hover:shadow-2xl' : 'bg-gray-900 opacity-50 cursor-not-allowed'}
      `}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      <Link to={isUnlocked ? `/module/${moduleName}` : '#'} className="block h-full">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <img src={image} alt={title} className="w-16 h-16 object-cover rounded-full mr-4 border-2 border-primary" />
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-text-light mb-4 flex-grow">{description}</p>
          {isUnlocked ? (
            <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              ></div>
              <span className="text-sm text-text-light mt-1 block text-right">{Math.round(progress * 100)}% Complete</span>
            </div>
          ) : (
            <div className="text-warning font-semibold text-sm">Locked</div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
