---
title: "Hello, World"
description: "这是我新博客的第一篇文章，主要讲讲建站思路。"
pubDate: 2026-10-01
tags: ["meta", "astro"]
---

欢迎。这是我用 Astro 5 搭建、托管在 Cloudflare Pages 上的个人博客。

## 为什么选 Astro

Astro 默认零 JS 发送到浏览器，文章页加载极快。Markdown 原生支持，写文章就是 `git commit`。

## 一段代码演示高亮

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

代码块有语言识别、行号、暗色模式自适应。

## 表格

| 方案 | 成本 | 速度 | 维护 |
|------|------|------|------|
| Pages + 静态站 | 0 | ★★★★★ | ★★★★ |
| Pages + SSR | 几乎 0 | ★★★★ | ★★★★★ |
| 自建服务器 | $$$ | ★★ | ★ |

## 引用

> 一篇好的技术博客，让三年后的自己还能看懂。

## 列表

- ✅ Markdown / MDX
- ✅ 代码高亮
- ✅ RSS / Sitemap / OG 图
- ⬜ 评论（暂不开）
- ⬜ 全站搜索

接下来会写更多内容。