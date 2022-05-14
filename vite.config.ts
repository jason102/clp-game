import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      envPlugin(env),
    ],
  };
});
