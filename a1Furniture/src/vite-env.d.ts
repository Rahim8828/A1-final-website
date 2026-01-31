/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Blog asset declarations
declare module '../blog/assets/*.js' {
  const content: string;
  export default content;
}

declare module '../../blog/assets/*.js' {
  const content: string;
  export default content;
}