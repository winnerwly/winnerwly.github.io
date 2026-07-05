# 顶部导航与主题切换图标优化开发文档

## 需求背景

用户反馈顶部导航栏中的 `INS` 和 `友链` 不见了，并希望优化主题切换按钮，将文字按钮改成图标按钮，同时引入或使用字体图标库优化界面细节。

当前页面顶部导航只保留了：首页、文章、分类、标签、关于。`themes/chic/_config.yml` 中仍然配置了 `INS` 和 `友链`，但当前 `header.ejs` 是手写导航，没有读取完整主题导航配置，因此这两个入口没有渲染出来。

## 需求目标

1. 恢复顶部导航中的 `INS` 和 `友链` 入口。
2. 同步恢复移动端菜单中的 `INS` 和 `友链` 入口。
3. 将主题切换按钮从“深色/浅色”文字按钮优化为图标按钮。
4. 使用字体图标优化导航和主题切换细节。
5. 保持现有深色/浅色主题切换逻辑可用。
6. 保持移动端布局不拥挤、不溢出。

## 当前状态分析

1. `themes/chic/layout/_partial/header.ejs` 当前手写了导航项，遗漏了 `INS` 与 `友链`。
2. `themes/chic/_config.yml` 中已有完整导航配置：
   - 主页
   - 文章
   - INS
   - 分类归档
   - 标签云
   - 关于我
   - 友链
3. 主题已经通过 `themes/chic/source/css/style.styl` 引入本地图标库：`../fonts/iconfont/iconfont.css`。
4. 现有图标库已有可复用图标：
   - `icon-blog`
   - `icon-category`
   - `icon-tags`
   - `icon-instagram`
   - `icon-link`
   - `icon-github`
5. 现有图标库未包含明确的太阳/月亮图标，因此主题切换图标需要二选一：
   - 方案 A：使用纯 CSS 绘制太阳/月亮状态图标。
   - 方案 B：新增外部字体图标库，如 Font Awesome 或 Remix Icon。
6. 由于当前主题已有本地图标库，优先复用本地图标库更稳定，不增加网络依赖；主题切换图标可使用 CSS 绘制，达到图标化效果。

## 实施方案

### 方案选择

采用“复用现有本地图标库 + CSS 绘制主题图标”的方案：

1. 不新增外部 CDN 或 npm 依赖，避免构建和网络风险。
2. 顶部导航和移动端菜单使用现有 `iconfont` 类名提升识别度。
3. 主题切换按钮改为只显示图标，保留 `aria-label` 给无障碍和可访问性。
4. JavaScript 不再改按钮文字，而是通过 `data-theme-mode` 或 `aria-label` 更新状态。

### 文件改动计划

1. 修改 `themes/chic/layout/_partial/header.ejs`
   - 恢复 `INS` 和 `友链`。
   - 为导航项加入图标。
   - 将主题切换按钮内部改为图标结构。
   - 移动端菜单同步调整。

2. 修改 `themes/chic/source/js/script.js`
   - 保留当前 localStorage 逻辑。
   - 改为更新按钮的 `aria-label`、`title` 和状态属性。
   - 不再用 `textContent` 覆盖按钮内部图标结构。

3. 修改 `themes/chic/source/css/custom.styl`
   - 调整导航项图标间距和 hover 状态。
   - 优化主题按钮尺寸、边框、图标状态。
   - 适配移动端导航，避免菜单项拥挤。

## 受影响文件

- `themes/chic/layout/_partial/header.ejs`
- `themes/chic/source/js/script.js`
- `themes/chic/source/css/custom.styl`
- `docs/requirements/2026-07-05-header-nav-theme-icon-optimization.md`

## 验证计划

1. 运行 `npm run build`，确认 Hexo 构建成功。
2. 本地访问首页，检查桌面端导航：
   - 首页、文章、INS、分类、标签、关于、友链均显示。
   - 主题切换按钮显示为图标。
   - 点击主题按钮可在深色/浅色间切换。
3. 检查移动端菜单：
   - `INS` 和 `友链` 存在。
   - 菜单按钮、关闭按钮、主题按钮不重叠。
4. 检查可访问性：
   - 主题按钮有 `aria-label` 和 `title`。
   - 图标不影响链接文本阅读。

## 风险与取舍

1. 若桌面导航项过多导致宽度紧张，需要缩小间距或在中等屏幕隐藏图标文本，但不优先减少入口。
2. 现有图标库没有太阳/月亮图标，使用 CSS 绘制主题图标可以满足图标化需求，但不是字体库图标。
3. 若用户明确要求使用某个外部字体图标库，可在后续确认后再引入；本次优先减少外部依赖。

## 确认记录

- 确认人：用户
- 确认时间：2026-07-05
- 确认结论：用户回复“加出来”，确认进入实现阶段
