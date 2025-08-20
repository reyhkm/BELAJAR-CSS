/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob: <T = unknown>(pattern: string, options?: { eager?: boolean }) => Record<string, T>;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
