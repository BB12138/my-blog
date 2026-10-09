---
title: "用 Cloudflare Pages 部署 Astro：踩坑笔记"
description: "把 Astro 站点通过 GitHub 自动部署到 Cloudflare Pages，并绑定自定义域的完整流程。"
pubDate: 2026-10-05
updatedDate: 2026-10-08
tags: ["cloudflare", "deploy", "astro"]
---

Cloudflare Pages 对 Astro 是「一等公民」支持，从 Dashboard 接入 GitHub 仓库开始，几乎不用写一行配置。

## 部署步骤（Dashboard 方式）

1. 登录 Cloudflare → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. 授权 Cloudflare 访问你的 GitHub，选要部署的 repo
4. 配置构建：
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. 点 **Save and Deploy**，第一次部署约 1-3 分钟

之后每次 `git push` 到 `main` 分支，Cloudflare 自动重新构建并部署。Pull Request 还会自动生成预览链接。

## 绑定自定义域

部署成功后默认给你一个 `xxx.pages.dev` 子域。绑定自己的域名：

1. 进入 Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入你要绑定的根域名，例如 `blog.example.com`
3. Cloudflare 会检查域名 NS 是否已指向 Cloudflare，是的话会自动添加 CNAME 记录

如果你的域名已经在 Cloudflare 托管（这次的情况），整个过程不超过 30 秒，证书自动签发。

## SSR 与 prerender

Astro 在 Cloudflare Pages 上有两种渲染模式：

```js
// astro.config.mjs
export default defineConfig({
  output: 'server', // 启用 SSR 能力
  adapter: cloudflare(),
});
```

```astro
---
// 单个页面强制静态预渲染
export const prerender = true;
---
```

> 纯内容站推荐 `output: 'server'` + 所有内容页 `prerender = true`，既能享受 CDN 缓存，又保留未来加动态功能的能力。

## 一个常见问题

部署后打开页面是白屏，看 Console 报「Hydration mismatch」。这是 Auto Minify 引起的：

**解决**：Pages 项目 → **Settings** → **Build** → 关闭 **Auto Minify**，重新部署即可。

## 小结

- Dashboard 接入 GitHub 是最省事的部署方式
- 域名已托管在 Cloudflare 时，自定义域一键绑（CNAME 自动加）
- 纯博客走 `prerender`，又快又便宜；想加 API 时去掉那一行就行