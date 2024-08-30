/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_STRIPE_KEY: string;
  VITE_STRIPE_SECRET: string;
  // Add more variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}