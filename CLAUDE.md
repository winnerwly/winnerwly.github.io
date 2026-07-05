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

## 强制开发流程（必须遵守）

本仓库有一套强制流程，详见根目录 `AGENTS.md` 与 `docs/README.md`。核心原则：

**先分析、再文档、经确认、后开发、再总结。**

- 任何需求/功能/修复/配置变更/页面改造，开发前必须先在 `docs/requirements/` 编写中文开发文档（含背景、目标、范围、现状、技术方案、影响范围、风险、测试重点、确认记录），经负责人确认后才可开发。
- 所有开发相关文档必须使用**中文**编写（技术字段、命令、路径、变量名等可保留原文）。文档统一存放 `docs/`，命名 `YYYY-MM-DD-需求名称.md`。
- 开发过程中若需求范围、技术方案、接口结构、页面交互、数据结构或风险点发生变化，必须暂停、更新文档并再次确认。
- 开发完成后必须在 `docs/reviews/` 输出中文总结文档。
- 未经确认不得直接修改业务代码、公共组件、接口逻辑或配置文件。

## 架构

### 站点与主题双层配置
- 站点级配置在根 `_config.yml`：站点信息、URL、permalink（`:year/:month/:day/:title/`）、分页、`theme: chic`、`hexo-neat` 压缩规则、`jsonContent`（生成文章元数据 JSON 供前端使用）。
- 主题级配置在 `themes/chic/_config.yml`：导航 `nav`、profile、社交 `links`、文章 meta/版权/TOC 开关、MathJax 按需加载、`stylesheets` 与 `scripts` 注入。
- 修改导航、关于页内容、友链、TOC 开关等，改主题配置而非模板。

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
- `source/js/script.js` 实现 light/dark 切换：在 `<html>`/`<body>` 上加 `.light-theme`/`.dark-theme` class 与 `data-theme` 属性，偏好持久化到 `localStorage` 的 `theme-preference` 键。`header` 中 `#theme-toggle` 与 `#mobile-toggle-theme` 为切换按钮。改切换行为时三者需同步。

### 部署
- `.github/workflows/pages.yml`：push 到 `main` 触发，Node 20，`npm install` + `npm run build`，将 `./public` 部署到 GitHub Pages。不要提交 `public/` 生成产物。

## 关键约定

- YAML、EJS、Stylus 嵌套统一用两个空格缩进。
- 提交信息格式：`feat: ...` / `fix: ...`，PR 需说明变更与验证结果，界面改动附截图。
- 不提交密钥、令牌、机器专属路径，不提交 `public/`。
- 修改站点元信息、URL、分页、渲染行为时同步更新 `_config.yml` 并 `npm run build` 验证。
