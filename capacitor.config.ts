import type { CapacitorConfig } from '@capacitor/cli';

// Capacitor configuration for the Djarvista iOS (and Android) app wrapper.
// The app is a server-rendered Next.js site, so instead of bundling a static
// export the native shell loads the live, always-current site. See APP_STORE.md
// for the full build + submission workflow and the native features (Camera,
// Push) that give it real native value beyond a plain web view.
const config: CapacitorConfig = {
  appId: 'com.djarvista.app',
  appName: 'Djarvista',
  // `webDir` is required by the CLI even when loading a remote URL; keep an empty
  // placeholder build here (see APP_STORE.md) so `npx cap sync` succeeds.
  webDir: 'public',
  server: {
    // Load the hosted app. Point this at production for the store build.
    url: 'https://www.djarvista.com',
    cleartext: false,
    // Allow first-party navigation only.
    allowNavigation: ['www.djarvista.com', 'djarvista.com', '*.supabase.co'],
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#003893',
  },
  backgroundColor: '#003893',
};

export default config;
