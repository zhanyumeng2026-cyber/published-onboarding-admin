# GitHub 上传清单与流程

## 1. 上传哪个目录

只上传本目录 `published-onboarding-admin/`，不要从它的上层目录 `柠萌薄荷糖/` 执行 `git add .`。上层目录混有多个项目、文档、研究资料和临时产物。

本目录已经是一个独立 Git 仓库，当前分支为 `main`，已有提交历史。开始整理前工作区干净；本次新增了本指南并更新了 README，需先提交这两项改动。已配置的 `sites` 远端用于 Codex Sites；它不是 GitHub。上传到 GitHub 时新增一个 `github` 远端即可，不必重建仓库或覆盖 `sites`。

## 2. 需要纳入版本控制的文件

建议纳入 Git 的完整文件清单如下（包含本次新增的 GitHub 指南）。页面主体是 `public/onboarding-admin-orchestrator.html`；其他文件负责入口、构建运行、依赖锁定或可选模板能力。

```text
.gitignore
.openai/hosting.json
README.md
GITHUB_上传清单与流程.md
app/chatgpt-auth.ts
app/globals.css
app/layout.tsx
app/page.tsx
build/sites-vite-plugin.ts
db/index.ts
db/schema.ts
drizzle.config.ts
drizzle/meta/_journal.json
eslint.config.mjs
examples/d1/app/api/notes/route.ts
examples/d1/db/schema.ts
next.config.ts
package-lock.json
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
public/favicon.svg
public/file.svg
public/globe.svg
public/onboarding-admin-orchestrator.html
public/window.svg
tests/rendered-html.test.mjs
tsconfig.json
vite.config.ts
worker/index.ts
```

页面本身以内联 HTML/CSS/JavaScript 为主，不依赖单独的本地图像文件。HTML 会从 `unpkg.com` 加载 Floating UI 和 Lucide，因此在线预览需要网络可访问该 CDN。页面是一个前端交互原型；把代码上传到 GitHub 不会同步线上数据，也不会自动部署回原来的 `chatgpt.site` 地址。

## 3. 不要上传的本地文件

仓库的 `.gitignore` 已忽略这些生成文件/目录，保持忽略即可：

```text
node_modules/
dist/
.next/
.vinext/
.wrangler/
.env*
coverage/
.vercel/
*.pem
```

此外不要提交 `.DS_Store`、日志、个人资料或其他项目的文件。不要使用 `git add -f` 强制加入被忽略项。`.openai/hosting.json` 当前包含 Sites 项目 ID，不是密钥；若计划创建公开仓库，先决定是否要公开这个托管标识。`.env*` 与密钥始终不应上传。

## 4. 上传前检查

1. 在 GitHub 新建一个空仓库。建议先设为 **Private**，确认源码和托管配置后再决定是否公开。
2. 不勾选 GitHub 自动创建 README、License 或 `.gitignore`，因为本地仓库已有这些文件和提交历史。
3. 在终端进入项目目录：

   ```bash
   cd "/Users/zhanyumeng/Documents/柠萌薄荷糖/published-onboarding-admin"
   git status --short --branch
   git remote -v
   ```

4. 确认状态中没有意外改动，并确认现有远端名称 `sites` 仍在。查看 `.openai/hosting.json` 中的项目 ID 是否适合放进目标仓库。
5. 本地预览（Node.js `>=22.13.0`）：

   ```bash
   npm ci
   npm run dev
   ```

   浏览器打开终端显示的地址，确认功能引导管理页能正常显示。`npm run build` 可用于构建检查。

   注意：仓库当前同时有 `package-lock.json` 与 `pnpm-lock.yaml`，README 与脚本采用 npm 流程；本次统一使用 `npm ci`，不要混用 npm/pnpm 安装。
6. 提交本次 README 和指南改动，再推送整个 `main` 分支的历史：

   ```bash
   git add README.md GITHUB_上传清单与流程.md
   git commit -m "Document onboarding admin GitHub workflow"
   ```

## 5. 添加 GitHub 远端并推送

把下面的地址替换成你刚创建的 GitHub 仓库地址（HTTPS 或 SSH 均可）：

```bash
git remote add github https://github.com/<你的用户名>/<仓库名>.git
git remote -v
git push -u github main
```

若 GitHub 仓库创建时已经有 README 等提交，推送可能因两边历史不同而被拒绝。不要使用 `--force` 覆盖历史；推荐在 GitHub 重建一个空仓库，或先备份后按 Git 提示合并远端提交。

推送成功后，在 GitHub 仓库页面确认 `public/onboarding-admin-orchestrator.html`、`app/`、`package.json` 和 README 均已出现。以后提交更新：

```bash
git add README.md GITHUB_上传清单与流程.md app public package.json package-lock.json
git commit -m "Update onboarding admin prototype"
git push github main
```

如改动了构建配置或其他源码，再将相应文件路径一并加入 `git add`。不要在本仓库使用 `git push` 不带远端名，以免推送到默认的 `sites` 远端。

## 6. GitHub Pages 与原线上地址

GitHub 仓库保存代码，不等于网站发布。原地址仍由 Codex Sites 托管；GitHub Pages 是另一项单独的公开托管配置。当前项目使用 vinext/Cloudflare Worker 构建，并非已配置好的 GitHub Pages 项目。若目标只是备份和版本管理，完成第 5 步即可；若希望通过 GitHub Pages 公开访问，需要另行配置静态发布目录，并评估管理后台页面是否适合公开访问。

## 7. 仓库当前状态的已知情况

- 项目仓库的 `main` 分支有既存提交历史；上传时继续推送该分支即可。
- `tests/rendered-html.test.mjs` 目前仍引用 starter 模板的预览组件和断言，与当前页面源码不一致；修复测试前不要把 `npm test` 结果当作本页面正确性的证明。
- `db/`、`drizzle/` 和 `examples/d1/` 是未启用的可选 D1/Drizzle 起始代码，不是当前交互原型的数据后端。
