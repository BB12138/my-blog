import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章集合
const blog = defineCollection({
  // 扫描 src/content/blog 下所有 .md / .mdx 文件
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      description: z.string().max(240),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };