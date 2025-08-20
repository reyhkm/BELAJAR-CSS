import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  const percentage = Math.round(progress * 100);

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
      <motion.div
        className="bg-success h-full rounded-full absolute top-0 left-0"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      ></motion.div>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {label ? `${label}: ${percentage}%` : `${percentage}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
