# ZenVFX CMS 功能引导管理原型

本仓库对应线上页面：[功能引导管理后台](https://feature-onboarding-admin.hvvn292hy9.chatgpt.site/onboarding-admin-orchestrator)。当前页面是交互原型，主要界面和交互逻辑集中在 `public/onboarding-admin-orchestrator.html`。`app/page.tsx` 将根路径重定向到该 HTML 页面。

## 本地运行

环境要求：Node.js `>=22.13.0`。

```bash
npm ci
npm run dev
```

终端会显示本地预览地址。生产构建命令为 `npm run build`。项目使用 vinext、Vite 和 Cloudflare Workers 工具链；GitHub 仓库本身不会自动部署为这个线上地址。

页面会从 unpkg 加载 Floating UI 和 Lucide，因此预览时需要能够访问 `unpkg.com`。

## 重要文件

- `public/onboarding-admin-orchestrator.html`：管理后台页面主体，包含页面内容、样式及交互逻辑。
- `app/page.tsx`：网站根路径重定向到上面的 HTML。
- `app/layout.tsx`、`app/globals.css`：应用布局和全局样式。
- `package.json`、`package-lock.json`：依赖、Node 版本和 npm 命令；安装依赖请使用 `npm ci`。
- `vite.config.ts`、`build/sites-vite-plugin.ts`、`worker/index.ts`：vinext/Vite/Cloudflare 构建及运行配置。
- `.openai/hosting.json`：Codex Sites 项目绑定配置，含 Sites 项目 ID；不是应用密钥，但属于当前托管环境的专用配置。
- `db/`、`drizzle/`、`drizzle.config.ts`、`examples/d1/`：预留的可选 D1/Drizzle 示例，目前页面不依赖数据库。
- `app/chatgpt-auth.ts`：可选的 ChatGPT 登录辅助函数，目前此页面没有使用它。
- `public/favicon.svg`、`public/file.svg`、`public/globe.svg`、`public/window.svg`：公共静态图标资源。
- `tests/rendered-html.test.mjs`：随项目保存的测试脚本。提交前应检查它是否与当前页面版本同步。

文件明细与 GitHub 操作步骤见 [`GITHUB_上传清单与流程.md`](./GITHUB_上传清单与流程.md)。

## 仓库注意事项

- 请在 `published-onboarding-admin/` 目录内操作 Git；上层目录还包含其他项目和个人资料。
- 本地已有一个名为 `sites` 的远端，指向 Codex Sites 托管仓库。添加 GitHub 仓库时请使用另一个远端名称（例如 `github`），保留 `sites`。
- `.gitignore` 已排除 `node_modules/`、`dist/`、`.wrangler/`、`.vinext/` 和 `.env*`。不要提交依赖目录、构建产物、缓存或密钥。
- 如仓库设为公开，请先确认是否要公开管理后台原型及 `.openai/hosting.json` 中的项目 ID；项目 ID 不是登录凭据，但会暴露托管项目标识。GitHub 仓库与 GitHub Pages 公开部署是两件不同的事。
