# Design Specification (Reference: getdesign.md)

本设计规范参考自 `getdesign.md`，采用了极致的**暗黑极客风（Dark Mode Native & Developer Aesthetic）**，专注于清晰的层级、高对比度的黑白灰排版以及极其克制的色彩点缀。

## 1. 核心理念 (Core Philosophy)
- **Developer-First (开发者优先)**：大量使用等宽字体（Monospace）、代码块元素、表格结构，营造类似终端（Terminal）或代码编辑器的沉浸感。
- **Monochrome Minimalism (单色极简)**：主色调仅为黑、白、灰，通过深浅不同的灰色来区分模块层级，而非依赖彩色。
- **Subtle Accents (微弱点缀)**：仅在极少数交互元素（如高光、特定按钮）上使用高饱和度的荧光色。

---

## 2. 色彩系统 (Color Palette)

### 基础背景 (Backgrounds)
整个页面的背景色逐级提亮，用于区分不同的卡片或内容区域：
- **Base Background**: `#000000` (纯黑，用于最底层背景)
- **Surface 100**: `#0A0A0A` (极深灰，用于次级背景)
- **Surface 200 / Card**: `#111111` (用于卡片、悬浮菜单等)

### 边框与分割线 (Borders & Dividers)
- **Border / Divider**: `#2E2E2E` (清晰但不过分刺眼的分割线)
- **Hover State**: `#1A1A1A` (卡片或列表 hover 时的底色)

### 文本 (Typography Colors)
- **Primary Text (Foreground)**: `#EDEDED` (主文本，高对比度但比纯白柔和)
- **Secondary Text (Muted)**: `#878787` 或 `#A0A0A0` (用于次要说明、辅助文本、列表破折号)
- **Tertiary Text**: `#454545` 到 `#666666` (极弱的占位符或禁用文本)

### 强调色 (Accents)
- **Primary Accent**: `#FFB1EE` (粉紫色，用于特定高亮或渐变)
- **Secondary Accent**: `#3DD68C` (亮绿色)

---

## 3. 排版与字体 (Typography)

排版风格混合了现代无衬线体与极客等宽字体：

- **Sans-serif (无衬线/正文)**: `Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Monospace (等宽/代码/标签)**: `Geist Mono, "SFMono-Regular", Menlo, monospace`
- **Display (展示字体/Logo)**: `GeistPixel-Line` 或 `GeistPixel-Square` (一种像素风格字体，用于 Logo 或特殊的强调标题)

### 字号与行高 (Sizes & Leading)
- **Text XS**: `0.75rem` (12px)
- **Text SM**: `0.875rem` (14px) - 常用作列表或次要信息
- **Text Base**: `1rem` (16px) - 正文
- **Heading 4XL**: `2.25rem` (36px) - 页面主标题
- **Leading (行高)**: 采用紧凑的 `1.25` 到 `1.625` (Relaxed)，保证文本块的紧密性。

---

## 4. 布局与间距 (Layout & Spacing)

- **Grid System**: 采用 CSS Grid 布局，列表通常表现为整齐的行或网格，列表项之间使用底边框（`border-bottom: 1px solid var(--color-border)`）进行严密的分割。
- **Max Width**: 容器通常限制在 `42rem` 到 `64rem` 之间（如 max-w-6xl），内容居中对齐，留出充足的两侧空白（White space）。
- **Border Radius (圆角)**:
  - 卡片和基础组件使用较小的圆角：`0.375rem` (sm) 到 `0.5rem` (md)
  - 按钮通常为胶囊形：`9999px` (full)

---

## 5. 交互与动效 (Interactions & Motion)

- **Hover 效果**: 极其轻量。列表行在 Hover 时底色变为 `#1A1A1A`，过渡时间极短（`0.1s` 到 `0.15s`），不拖泥带水（`cubic-bezier(0.4, 0, 0.2, 1)`）。
- **阴影 (Shadows)**: 几乎不使用发散的大阴影，而是使用极其克制的纯色投影，例如 `color-mix(in oklab, var(--color-border) 100%, transparent)`。
- **Focus 状态**: 使用 `#2E2E2E` 或主背景色作为 ring offset，保证键盘导航时的高级感。

---

## 6. UI 元素范例 (UI Elements Example)

### 列表行 (List Row)
高度结构化，类似数据表：
- 左侧：24px 宽度的 Icon (灰阶或小面积彩色)。
- 中间：等宽字体的标题（`Geist Mono`, `semibold`, `#EDEDED`）。
- 右侧：描述文本（灰色，截断显示）及破折号占位符。
- 交互：Hover 时行背景微亮，无位移动画。

### 顶部导航 (Navbar) / 底部导航 (Footer)
- 顶部导航通常与背景融为一体，或者使用轻微的毛玻璃（Backdrop blur）效果。
- 底部使用简单的 flex 布局，包含文本和极其低调的灰色链接。

---

## 总结
要复刻 `getdesign.md` 的风格，关键在于**“做减法”**。去除一切不必要的卡片阴影、渐变和彩色图标，将边框调暗至 `#2e2e2e`，背景彻底变黑，文字采用纯净的黑白灰对比，并大面积引入 `Geist Mono` 这类等宽字体来强化极客感。