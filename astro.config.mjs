// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import expressiveCode from 'astro-expressive-code';

import { SITE_URL } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
      // 显式声明扫描范围，避免 Tailwind 警告 content 为空
      nestedRules: true,
    }),
    expressiveCode({
      // 暗色 / 亮色 双主题代码块
      themes: ['github-light', 'github-dark'],
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontSize: '0.9rem',
      },
    }),
    mdx(),
    sitemap(),
  ],
});