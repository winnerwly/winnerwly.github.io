# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 Hexo 7.3.0 的个人静态博客，使用自定义 `chic` 主题，通过 GitHub Actions 部署到 GitHub Pages（站点 URL：https://www.wangliuyin.top）。无独立测试套件，以 `npm run build` 作为基础验证。

## 常用命令

- `npm install`：安装 Hexo 与渲染依赖（Node 20）。
- `npm run start`：`hexo clean && hexo g && hexo s`，清理、生成并启动本地预览（默认 http://localhost:4000）。
- `npm run build`：`hexo clean && hexo g`，清理并生成静态文件到 `public/`。CI 与本地验证均用此命令。
- `npx hexo new "文章标题"`：基于 `scaffolds/post.md` 创建新文章到 `source/_posts/`。
- `npx hexo clean` / `npx hexo g` / `npx hexo s` / `npx hexo d`：Hexo 原生命令（清理 / 生成 / 预览 / 部署）。

注意：`hexo-neat` 在生成阶段自动压缩 HTML/CSS/JS，改动样式或脚本后必须 `hexo clean` 再生成，否则可能看到旧压缩产物。

### 环境与依赖说明
- CI（`.github/workflows/pages.yml`）与本地验证均用 `npm install` + `npm run build`，Node 20，因此 **npm 是本项目的标准包管理器**。仓库实际跟踪的锁文件是 `pnpm-lock.yaml`（`package-lock.json` 被 `.gitignore` 忽略），与 CI 用的 npm 不一致——以 npm 为准，`pnpm-lock.yaml` 可能滞后，不要据此推断依赖版本。
- `README.md` 内容已过时：其中描述的是旧 `yilia` 主题与手动 `git clone` 主题的流程，与当前已内置的 `chic` 主题不符，不要以 README 作为当前搭建方式的依据，以本文件与 `_config.yml` 为准。
- `npx hexo new` 基于 `scaffolds/post.md` 生成新文章，该 scaffold 的 Front Matter 是占位值（`title: 这是一个默认标题,请修改`、`category: 2024`、`tags: [js]`），创建后必须手动改为实际标题、分类年份与标签。

## 强制开发流程（必须遵守）

本仓库有一套强制流程，详见根目录 `AGENTS.md` 与 `docs/README.md`。核心原则：

**先分析、再文档、经确认、后开发、再总结。**

流程分两档：

- **需求变更**（新功能、页面改造、接口/配置变更、逻辑重构等）：开发前必须先在 `docs/requirements/` 编写中文开发文档（含背景、目标、范围、现状、技术方案、影响范围、风险、测试重点、确认记录），经负责人确认后才可开发；开发完成后在 `docs/reviews/` 输出中文总结文档。未经确认不得直接修改业务代码、公共组件、接口逻辑或配置文件。
- **缺陷修复及简单小需求**：可快速直接处理，无需事前文档与确认；但完成后必须在 `docs/`（建议放 `docs/changes/`）记录**变更内容、影响范围、验证结果**。若修复过程中发现范围扩大、涉及公共组件或基础架构，须升级为需求变更流程，补文档并确认后再继续。

通用要求（两档均适用）：
- 所有开发相关文档必须使用**中文**编写（技术字段、命令、路径、变量名等可保留原文）。文档统一存放 `docs/`，命名 `YYYY-MM-DD-需求名称.md`。
- 开发过程中若需求范围、技术方案、接口结构、页面交互、数据结构或风险点发生变化，必须暂停、更新文档并再次确认。

## 架构

### 站点与主题双层配置
- 站点级配置在根 `_config.yml`：站点信息、URL、permalink（`:year/:month/:day/:title/`）、分页、`theme: chic`、`hexo-neat` 压缩规则、`jsonContent`（生成文章元数据 JSON 供前端使用）。
- 主题级配置在 `themes/chic/_config.yml`：实际被模板读取的字段为 `favicon`、`date_format`/`time_format`、`page_title_enable`、文章 meta/版权/TOC 开关（`post_*`）、`mathjax`、`stylesheets`/`scripts` 注入。
- **导航与站点品牌写死在模板里，不在主题配置**：`layout/_partial/header.ejs` 顶部的 `navItems` 数组硬编码了导航项（图标 SVG + 文案 + 路由），品牌标记 `W` / 「前端小站」同样硬编码。主题配置中的 `nav`、`navname`、`nickname`、`avatar`、`description`、`links` 字段已不再被任何模板引用，改导航/品牌须直接改 `header.ejs`，改 `nav` 配置无效。TOC 开关、文章 meta、版权、MathJax、favicon、注入的样式/脚本才走主题配置。
- 关于页内容在 `source/about/`，友链在 `source/friends/`，改这两个页面改其 Markdown/页面源文件。

### 内容组织
- 文章：`source/_posts/*.md`，文件名为时间戳形式（如 `2604201000.md`，手动新增文章须保持一致）。`post_asset_folder: true`，文章同名资源目录存放图片等。
- Front Matter 字段：`title`、`tags`（数组）、`category`（年份字符串，如 `2026`）、`date`。需数学公式时加 `mathjax: true`。
- 独立页面：`source/about/`、`source/category/`、`source/tag/`、`source/friends/`、`source/ins/`，各对应主题下的同名 layout。
- `_config.yml` 的 `skip_render` 排除了部分 post 内的 `.html` 文件，新增此类文件时需同步配置。

### 主题结构（`themes/chic/`）
- `layout/layout.ejs` 是所有页面外层包裹：`head` → `header` → `<%- body %>` → `footer`，首页 `<body>` 加 `home-page` class。
- `layout/*.ejs` 为各页面入口（index/post/archive/category/tag/about/friends/ins/page），具体渲染逻辑多在 `layout/_page/*.ejs`。
- `layout/_partial/` 为复用片段：`head`、`header`、`footer`、`toc`、`paginator`。
- 关注点分离：**结构改 EJS，视觉改 `.styl`，浏览器行为改 `source/js/script.js`**。

### 样式系统（`themes/chic/source/css/`）
- `style.styl` 为入口，引入 `normalize`、`variable`、`font`、`base`、`layout`、`media`、`custom`。
- `variable.styl` 定义 light/dark 双套颜色 token（`$light-*` / `$dark-*`、`$primary-color` 等）。
- `custom.styl` 是当前实际生效的视觉层：以深色为默认（`#07090d` 背景），包含大量组件级覆盖。改样式优先在此文件追加，避免分散到其它 `.styl`。

### 主题切换
- `source/js/script.js` 实现 light/dark 切换：在 `<html>`/`<body>` 上加 `.light-theme`/`.dark-theme` class 与 `data-theme` 属性，偏好持久化到 `localStorage` 的 `theme-preference` 键。切换按钮为 `header` 中的 `#theme-toggle`（唯一一个主题按钮，无独立的移动端主题按钮）。改切换行为改 `script.js`。
- 移动端菜单是另一套独立逻辑：`#site-menu-toggle` 触发 `#site-mobile-menu` 的展开/收起，内联脚本写在 `header.ejs` 底部，靠 `.is-open` / `.nav-menu-open` class 控制。改菜单行为改 `header.ejs` 末尾的 `<script>`，与主题切换互不影响。

### 部署
- `.github/workflows/pages.yml`：push 到 `main` 触发，Node 20，`npm install` + `npm run build`，将 `./public` 部署到 GitHub Pages。不要提交 `public/` 生成产物。

## 关键约定

- YAML、EJS、Stylus 嵌套统一用两个空格缩进。
- 提交信息格式：`feat: ...` / `fix: ...`，PR 需说明变更与验证结果，界面改动附截图。
- 不提交密钥、令牌、机器专属路径，不提交 `public/`。
- 修改站点元信息、URL、分页、渲染行为时同步更新 `_config.yml` 并 `npm run build` 验证。
