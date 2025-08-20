import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'onPan' | 'onPanStart' | 'onPanEnd' | 'onTap' | 'onTapStart' | 'onTapCancel' | 'onHoverStart' | 'onHoverEnd'> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
  
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/80 text-white focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary/80 text-white focus:ring-secondary',
    success: 'bg-success hover:bg-success/80 text-white focus:ring-success',
    error: 'bg-error hover:bg-error/80 text-white focus:ring-error',
    outline: 'bg-transparent border border-text-light text-text-light hover:bg-text-light/10 focus:ring-text-light'
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
