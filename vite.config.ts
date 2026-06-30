import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Use absolute root '/' in local development and container environments to prevent Vite middleware
  // asset loading errors (white/blank screen). Use relative base path './' only during GitHub Actions
  // static builds to ensure full portability on GitHub Pages subdirectory hosting.
  const isGithubActions = !!process.env.GITHUB_REPOSITORY;
  const base = isGithubActions ? './' : '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      
      // ADDED: Allow requests from your Nginx reverse proxy domains
      allowedHosts: [
        'trojanrecovery.com',
        'www.trojanrecovery.com'
      ]
    },
  };
});