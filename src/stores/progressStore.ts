import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Challenge, ModuleData } from '@/types/challenges';

// Import challenge data
import selectorsChallenges from '@/data/challenges/selectors.json';
import boxModelChallenges from '@/data/challenges/box-model.json';
import flexboxChallenges from '@/data/challenges/flexbox.json';

interface UserProgress {
  [moduleKey: string]: {
    [levelIndex: number]: string; // User's code
  };
}

interface CompletionStatus {
    [moduleKey: string]: {
        [levelIndex: number]: boolean; // true if completed
    };
}

interface State {
  modules: { [key: string]: ModuleData };
  activeModule: string;
  activeLevelIndex: number;
  userProgress: UserProgress;
  completionStatus: CompletionStatus;
}

interface Actions {
  loadChallenges: () => void;
  setActiveModuleAndLevel: (module: string, levelIndex: number) => void;
  setUserCode: (code: string) => void;
  completeLevel: () => void;
  goToNextLevel: () => void;
}

export const useProgressStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      modules: {},
      activeModule: '',
      activeLevelIndex: 0,
      userProgress: {},
      completionStatus: {},

      loadChallenges: () => {
        const modulesData = {
          selectors: {
            name: 'The Selector Garden',
            challenges: selectorsChallenges as unknown as Challenge[],
          },
          'box-model': {
            name: 'The Box Model Citadel',
            challenges: boxModelChallenges as unknown as Challenge[],
          },
          flexbox: {
            name: 'The Flexbox Fleet',
            challenges: flexboxChallenges as unknown as Challenge[],
          },
        };
        set({ modules: modulesData });
      },

      setActiveModuleAndLevel: (module, levelIndex) => {
        set({ activeModule: module, activeLevelIndex: levelIndex });
      },

      setUserCode: (code) => {
        const { activeModule, activeLevelIndex } = get();
        if (!activeModule) return;

        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [activeModule]: {
              ...state.userProgress[activeModule],
              [activeLevelIndex]: code,
            },
          },
        }));
      },

      completeLevel: () => {
        const { activeModule, activeLevelIndex } = get();
        if (!activeModule) return;

        set(state => ({
            completionStatus: {
                ...state.completionStatus,
                [activeModule]: {
                    ...state.completionStatus[activeModule],
                    [activeLevelIndex]: true
                }
            }
        }))
      },

      goToNextLevel: () => {
        const { activeModule, activeLevelIndex, modules } = get();
        const currentModule = modules[activeModule];
        if (currentModule && activeLevelIndex < currentModule.challenges.length - 1) {
          set({ activeLevelIndex: activeLevelIndex + 1 });
        }
      },
    }),
    {
      name: 'css-quest-progress', // name of the item in the storage (must be unique)
    }
  )
);
