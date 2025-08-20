import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background text-text"
    >
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl text-text-light mb-8">Page Not Found</p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Go to Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
