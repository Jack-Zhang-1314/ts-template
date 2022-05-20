/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly NODE_ENV: producting | development | testing
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
