import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';
import astroI18next from 'astro-i18next';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { name, version } from './package.json';

process.env = loadEnv(import.meta.env.MODE, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind(),
    astroI18next(),
  ],
  output: 'server',
});
