import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Les Recettes de Cuisine',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
