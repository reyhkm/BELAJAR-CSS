import { useProgressStore } from '@/stores/progressStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';

const MapPage = () => {
  const modules = useProgressStore((state) => state.modules);
  const userProgress = useProgressStore((state) => state.userProgress);

  const moduleKeys = Object.keys(modules);

  const getModuleProgress = (moduleKey: string) => {
    const module = modules[moduleKey];
    const progress = userProgress[moduleKey] || {};
    const completedCount = Object.values(progress).filter(Boolean).length;
    const totalCount = module.challenges.length;
    return { completedCount, totalCount };
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-brand-accent">CSS Quest Map</h1>
      <p className="text-center text-lg mb-12">Pilih sebuah dunia untuk memulai petualangan CSS-mu!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moduleKeys.map((key, index) => {
          const module = modules[key];
          const { completedCount, totalCount } = getModuleProgress(key);
          const isCompleted = completedCount === totalCount;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/module/${key}`} className="block p-6 bg-brand-primary rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold mb-2 text-white">{module.name}</h2>
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-400" size={28} />
                  ) : (
                    <Lock className="text-gray-400" size={28} />
                  )}
                </div>
                <p className="text-gray-300 mb-4">Tantangan: {key.replace('-', ' ')}</p>
                <div className="w-full bg-brand-secondary rounded-full h-2.5">
                  <div 
                    className="bg-brand-accent h-2.5 rounded-full"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm mt-2 text-gray-400">{completedCount} / {totalCount} Selesai</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MapPage;
