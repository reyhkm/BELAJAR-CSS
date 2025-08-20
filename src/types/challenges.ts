export interface Solution {
  type: 'selector' | 'style';
  selector: string;
  properties?: { [key: string]: string };
}

export interface Challenge {
  id: string;
  title: string;
  instruction: string;
  html: string;
  cssStarter: string;
  solution: Solution;
}

export interface ModuleData {
  name: string;
  challenges: Challenge[];
}
