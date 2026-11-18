import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const frontendSource = fileURLToPath(new URL('../aspiring-managers-frontend/src/', import.meta.url));

export default defineConfig({
  site: 'https://www.aspiringmanagers.ro',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['@radix-ui/react-dialog', 'lucide-react', 'vaul', 'clsx', 'tailwind-merge'] },
    resolve: {
      alias: { '@': frontendSource },
      // Shared components and Astro islands must resolve the same package instances.
      dedupe: ['react', 'react-dom', 'lucide-react', '@radix-ui/react-dialog', 'clsx', 'tailwind-merge'],
    },
    server: { fs: { allow: ['.', frontendSource] } },
  },
});
