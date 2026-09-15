import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Ra9ge.github/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
});
