/// <reference types="vite/client" />

// Extend the Vite import meta env types with any custom VITE_ variables used in the app.
interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY?: string;
    // add more env vars here as needed, for example:
    // readonly VITE_SOME_FLAG: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
