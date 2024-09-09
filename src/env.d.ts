/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly APPWRITE_PROJECT_ID: string;
  readonly APPWRITE_DATABASE_ID: string;
  readonly PROJECTS_COLLECTION_ID: string;
  readonly APPWRITE_API_ENDPOINT: string;
  readonly APPWRITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
