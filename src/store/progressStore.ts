import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Challenge, Solution } from '../types/challenge';

// Dynamically import all challenge JSON files
const challengeModules = import.meta.glob('../data/challenges/*.json', { eager: true });

interface UserLevelProgress {
  completed: boolean;
  userCode: string;
}

interface UserModuleProgress {
  [challengeId: string]: UserLevelProgress;
}

interface ProgressState {
  modules: { [moduleName: string]: Challenge[] };
  moduleOrder: string[]; // To maintain a consistent order of modules
  activeModule: string | null;
  activeLevelIndex: number;
  userProgress: { [moduleName: string]: UserModuleProgress };
  
  // Actions
  setActiveModule: (moduleName: string) => void;
  setActiveLevelIndex: (index: number) => void;
  updateUserCode: (moduleName: string, challengeId: string, code: string) => void;
  markLevelCompleted: (moduleName: string, challengeId: string) => void;
  resetProgress: () => void;
}

const initialModules: { [moduleName: string]: Challenge[] } = {};
const initialModuleOrder: string[] = [];

// Process imported challenge data
for (const path in challengeModules) {
  const moduleName = path.split('/').pop()?.replace('.json', '');
  if (moduleName) {
    initialModules[moduleName] = (challengeModules[path] as { default: Challenge[] }).default;
    initialModuleOrder.push(moduleName);
  }
}

// Sort modules by a predefined order for consistent display
const predefinedOrder = [
  'selectors',
  'box-model',
  'color-text',
  'flexbox',
  'grid',
  'positioning',
  'transitions-animations'
];

initialModuleOrder.sort((a, b) => {
  const indexA = predefinedOrder.indexOf(a);
  const indexB = predefinedOrder.indexOf(b);
  return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      modules: initialModules,
      moduleOrder: initialModuleOrder,
      activeModule: initialModuleOrder[0] || null,
      activeLevelIndex: 0,
      userProgress: {},

      setActiveModule: (moduleName) => set({ activeModule: moduleName }),
      setActiveLevelIndex: (index) => set({ activeLevelIndex: index }),

      updateUserCode: (moduleName, challengeId, code) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [moduleName]: {
              ...(state.userProgress[moduleName] || {}),
              [challengeId]: {
                ...(state.userProgress[moduleName]?.[challengeId] || { completed: false, userCode: '' }),
                userCode: code,
              },
            },
          },
        }));
      },

      markLevelCompleted: (moduleName, challengeId) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [moduleName]: {
              ...(state.userProgress[moduleName] || {}),
              [challengeId]: {
                ...(state.userProgress[moduleName]?.[challengeId] || { completed: false, userCode: '' }),
                completed: true,
              },
            },
          },
        }));
      },

      resetProgress: () => {
        set({
          userProgress: {},
          activeModule: initialModuleOrder[0] || null,
          activeLevelIndex: 0,
        });
      },
    }),
    {
      name: 'css-quest-progress-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        userProgress: state.userProgress,
        activeModule: state.activeModule,
        activeLevelIndex: state.activeLevelIndex,
      }),
    }
  )
);
