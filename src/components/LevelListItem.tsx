import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

interface LevelListItemProps {
  levelIndex: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: (index: number) => void;
}

const LevelListItem: React.FC<LevelListItemProps> = ({
  levelIndex,
  title,
  isCompleted,
  isActive,
  onClick,
}) => {
  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200
        ${isActive ? 'bg-primary text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600 text-text-light'}
      `}
      onClick={() => onClick(levelIndex)}
    >
      <span className="mr-3">
        {isCompleted ? (
          <FaCheckCircle className="text-success" />
        ) : (
          <FaCircle className="text-gray-400" />
        )}
      </span>
      <span className="flex-grow text-sm font-medium">Level {levelIndex + 1}: {title}</span>
    </motion.li>
  );
};

export default LevelListItem;
