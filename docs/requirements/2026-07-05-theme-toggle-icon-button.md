# 主题切换按钮改为图标按钮开发文档

## 需求背景

用户反馈主题切换按钮希望“换成 icon”，并明确要求“直接开发”。当前按钮为胶囊式 toggle，虽然解决了黑圆问题，但视觉上仍偏开关控件，不符合用户希望的纯图标按钮方向。

## 需求目标

1. 将主题切换控件从胶囊开关改为纯 icon 按钮。
2. 深色主题状态显示月亮图标，提示可切换到浅色主题。
3. 浅色主题状态显示太阳图标，提示可切换到深色主题。
4. 使用线性 SVG 图标，与当前导航 Lucide 风格保持一致。
5. 保留现有 JS 切换逻辑、`aria-label` 和 `title`。
6. 桌面端和移动端按钮尺寸协调，不挤压导航。

## 当前状态分析

1. `themes/chic/layout/_partial/header.ejs` 中主题按钮内部是 `.theme-icon` 单一元素。
2. `themes/chic/source/css/custom.styl` 中 `.theme-toggle` 当前为胶囊轨道，依赖 `data-theme-mode` 移动内部滑块。
3. `themes/chic/source/js/script.js` 已通过 `data-theme-mode` 标记当前主题状态，可继续复用。

## 实施方案

1. 修改 `themes/chic/layout/_partial/header.ejs`：
   - 在主题按钮内放入两个内联 SVG：`.theme-icon-sun` 和 `.theme-icon-moon`。
   - 桌面端与移动端按钮使用同一结构。
2. 修改 `themes/chic/source/css/custom.styl`：
   - `.theme-toggle` 改为圆形 icon 按钮。
   - 默认隐藏所有主题图标。
   - `data-theme-mode='dark'` 时显示月亮图标。
   - `data-theme-mode='light'` 时显示太阳图标。
3. 不修改 JS 行为。

## 受影响文件

- `themes/chic/layout/_partial/header.ejs`
- `themes/chic/source/css/custom.styl`
- `docs/requirements/2026-07-05-theme-toggle-icon-button.md`

## 验证计划

1. 运行 `npm run build`。
2. 检查生成页面有太阳/月亮 SVG。
3. 检查旧胶囊滑块位移样式不再存在。
4. 检查 `localhost:4000/category/` 可访问并返回新按钮结构。

## 风险与取舍

1. 纯 icon 按钮比胶囊开关更简洁，但当前状态的“开/关”感不如开关明显。
2. 通过 `aria-label` 和 `title` 保留可访问提示，降低纯图标造成的理解成本。

## 确认记录

- 确认人：用户
- 确认时间：2026-07-05
- 确认结论：用户回复“主题切换的按钮换成 icon，直接开发”，确认进入实现阶段
