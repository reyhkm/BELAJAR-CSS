export interface SolutionBase {
  type: 'selector' | 'style';
  selector: string;
}

export interface SelectorSolution extends SolutionBase {
  type: 'selector';
  // For selector challenges, we'll implicitly check if the selector applies a specific validation style
  // to the correct elements and only those elements.
}

export interface StyleSolution extends SolutionBase {
  type: 'style';
  properties: Record<string, string>; // CSS properties and their expected computed values
}

export type Solution = SelectorSolution | StyleSolution;

export interface Challenge {
  id: string;
  title: string;
  instruction: string;
  html: string;
  cssStarter: string;
  solution: Solution;
}
