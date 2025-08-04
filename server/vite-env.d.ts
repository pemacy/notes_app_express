/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly NODE_ENV: string;
  // Add more env variables as needed, ensuring they are prefixed with VITE_
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
