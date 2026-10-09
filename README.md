# 我的博客

Astro 5 + Cloudflare Pages + Tailwind CSS 的极简博客模板。
代码推 GitHub → Cloudflare 自动构建部署 → 全球 CDN，零服务器成本。

## 技术栈

- **Astro 5** — SSR 模式下 build，所有内容页 `prerender = true` 走 CDN
- **Cloudflare Pages** — 通过 GitHub 集成自动部署
- **Tailwind CSS 3** — 实用类样式 + 暗色模式（无额外 JS）
- **astro-expressive-code** — 代码高亮（双主题）
- **@astrojs/rss / sitemap** — RSS 订阅 + 站点地图
- **Content Collections** — Markdown / MDX 文章管理

## 目录结构

```
.
├── astro.config.mjs       # Astro + Cloudflare 适配器 + 集成
├── src/
│   ├── components/         # BaseHead、Header、Footer、ThemeToggle...
│   ├── content/blog/       # 你的 Markdown 文章
│   ├── pages/              # 文件即路由（index / blog / about / rss.xml）
│   ├── layouts/           # BaseLayout / BlogPost
│   ├── styles/global.css  # Tailwind base + 自定义
│   ├── consts.ts          # 站点配置（标题、URL、社交链接）
│   └── content.config.ts  # Markdown frontmatter schema
├── public/                # 静态资源（favicon、robots、OG 图）
├── wrangler.toml          # 本地预览用 wrangler pages dev
└── package.json
```

## 一、上手本地开发

需要 Node.js 20+（`nvm install 20`）。

```bash
npm install
npm run dev          # http://localhost:4321
```

## 二、配置你自己的站点信息

打开 `src/consts.ts`，至少改两个地方：

```ts
export const SITE_URL = 'https://your-domain.com';   // 上线前改成正式域名
export const SITE_TITLE = '我的博客';
export const SITE_DESCRIPTION = '...';
export const SITE_AUTHOR = '你的名字';

export const SOCIAL_LINKS = [
  { href: 'https://github.com/your-handle', label: 'GitHub' },
];
```

## 三、上线部署（GitHub + Cloudflare Pages）

### 1. 把项目推到 GitHub

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-name/your-repo.git
git push -u origin main
```

### 2. Cloudflare Dashboard 接入 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages** 标签 → **Connect to Git**
3. 授权 Cloudflare 访问 GitHub，选你刚推的 repo
4. 配置构建（一般 Astro 预设会自动识别，确认即可）：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **NODE_VERSION**: `20`（环境变量里加，Cloudflare 默认 18 太老）
6. 点 **Save and Deploy**，第一次约 1-3 分钟

### 4. 绑定你的域名

部署成功后会得到一个 `xxx.pages.dev` 子域。绑正式域名：

1. Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入你的域名（例如 `blog.example.com` 或根域名 `example.com`）
3. 因为域名 NS 已经在 Cloudflare，Cloudflare 会自动添加 CNAME 记录并签发证书
4. 全程不用动 DNS，几十秒就生效

### 5. 替换 OG 图（可选但推荐）

`public/og-default.svg` 是个简单的占位图。正式上线建议换成 PNG：

- 推荐尺寸：1200 × 630
- 工具：[og-playground.vercel.app](https://og-playground.vercel.app/) 一键生成
- 替换 `public/og-default.svg`（注意保留同名）或在 `BaseHead.astro` 里改 image 默认值

## 四、写新文章

在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "我的第二篇文章"
description: "一句话简介，会出现在卡片和 SEO meta 里。"
pubDate: 2026-10-09
draft: false
tags: ["tech", "note"]
---

正文，支持 Markdown / MDX / 代码块 / 表格 / 图片 ...
```

支持的 frontmatter 字段（见 `src/content.config.ts`）：

| 字段 | 必填 | 说明 |
|------|------|--------|
| `title` | ✅ | 文章标题 |
| `description` | ✅ | 卡片摘要 / meta description |
| `pubDate` | ✅ | 发布日期 |
| `updatedDate` | ❌ | 更新日期（可选） |
| `tags` | ❌ | 字符串数组，文章卡片会展示 |
| `draft` | ❌ | `true` 时不展示、不收录到 RSS、不生成页面 |
| `heroImage` | ❌ | 头图，相对 `src/content/blog/` 引用 |

写完 `git push`，Cloudflare 几分钟后自动重新部署。

## 五、本地预览生产构建

```bash
npm run build        # 产出到 ./dist
npx wrangler pages dev ./dist   # 用 Cloudflare Workers 运行时模拟生产环境
```

## 六、添加动态功能（可选）

当前所有内容页都 `prerender = true`，build 时生成静态 HTML。
未来想加 API / 动态路由 / 表单处理，只需在那个页面里删掉 `prerender = true`，Astro 会在 Cloudflare Workers 上每次请求时实时渲染（仍走 CDN 边缘）。

```astro
---
export const prerender = false; // 改成 false 即开启 SSR
---
```

## 常见问题

**Q: 部署后打开页面是白屏？**
A: Console 报 Hydration mismatch 是 Auto Minify 引起的。
Pages 项目 → **Settings** → **Build** → 关闭 **Auto Minify**，重新部署。

**Q: 怎么加评论？**
A: 推荐接 [Giscus](https://giscus.app/)（基于 GitHub Discussions，纯静态方案）。在 `BlogPost.astro` 里加一段 script 即可。

**Q: 怎么加全站搜索？**
A: 轻量方案用 [Pagefind](https://pagefind.app/)（build 时生成索引，纯静态搜索）；重型方案用 Algolia。

**Q: 域名要备案吗？**
A: 域名放在 Cloudflare 全球 CDN 上访问**不需要**国内备案。如果你想国内访问快，可以额外接国内 CDN，但这超出本项目范围。