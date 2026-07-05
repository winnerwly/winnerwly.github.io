# 导航线性图标替换开发文档

## 需求背景

用户反馈当前字体图标库“太丑了”，希望更换为线性图标。此前已推荐 `Lucide Icons`、`Remix Icon`、`Tabler Icons`、`Heroicons`，用户回复“好”，按推荐优先采用 `Lucide` 风格。

当前顶部导航使用主题旧的 `iconfont` 字体图标，例如 `icon-blog`、`icon-publish`、`icon-instagram`、`icon-category`、`icon-tags`、`icon-resume`、`icon-link`。这些图标视觉较老，与当前深色科技风和克制内容站风格不匹配。

## 需求目标

1. 将顶部导航和移动端菜单中的旧字体图标替换为更现代的线性图标。
2. 采用 Lucide 风格的 SVG 线性图标，不使用外部 CDN。
3. 保持导航文字、链接、主题切换按钮和移动端菜单行为不变。
4. 不删除旧 `iconfont` 资源，避免影响主题其它旧模块或社交链接。
5. 构建通过，生成页面中导航图标正常输出。

## 当前状态分析

1. `themes/chic/layout/_partial/header.ejs` 中导航项直接写入 `i.iconfont`。
2. `themes/chic/source/css/custom.styl` 中有 `.navbar .menu a .iconfont` 与移动端 `.iconfont` 样式。
3. `themes/chic/source/css/style.styl` 仍引入旧 `iconfont`，但旧字体图标不只可能用于导航，暂不移除。
4. 主题切换按钮已是 CSS 绘制的胶囊开关，本次不再调整。

## 实施方案

1. 在 `themes/chic/layout/_partial/header.ejs` 中将导航图标替换为内联 SVG：
   - 首页：book-open
   - 文章：file-text
   - INS：instagram
   - 分类：folder
   - 标签：tag
   - 关于：id-card 或 user
   - 友链：link
2. 为 SVG 添加统一类名 `nav-icon`，保留 `aria-hidden="true"`。
3. 在 `themes/chic/source/css/custom.styl` 中将 `.iconfont` 导航样式替换为 `.nav-icon`。
4. 移动端菜单同步使用 `.nav-icon`。
5. 不修改 `themes/chic/source/css/style.styl` 的旧 `iconfont` 引入，避免扩大影响。

## 受影响文件

- `themes/chic/layout/_partial/header.ejs`
- `themes/chic/source/css/custom.styl`
- `docs/requirements/2026-07-05-lucide-linear-nav-icons.md`

## 验证计划

1. 运行 `npm run build`。
2. 检查生成的首页和归档页导航：
   - 所有导航入口仍存在：首页、文章、INS、分类、标签、关于、友链。
   - 旧 `iconfont` 类不再出现在导航模板中。
   - 新 `nav-icon` SVG 正常输出。
3. 检查移动端菜单仍正常展开，图标与文字对齐。
4. 检查主题切换按钮不受影响。

## 风险与取舍

1. 内联 SVG 会让 `header.ejs` 略长，但不增加外部依赖，稳定性最好。
2. 旧 `iconfont` 资源暂不删除，后续如全站确认不用了，可以再单独清理。
3. 本次只替换导航图标，不处理文章页或其它页面中可能残留的旧图标样式。

## 确认记录

- 确认人：用户
- 确认时间：2026-07-05
- 确认结论：用户回复“开发把”，确认进入实现阶段
