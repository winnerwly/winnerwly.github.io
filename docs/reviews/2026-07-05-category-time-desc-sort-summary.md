# 分类页按时间倒序排序开发总结

## 一、本次完成内容

本次已完成分类相关页面排序调整：

- `/category/` 分类索引页从按分类名称排序调整为按分类下最新文章发布时间倒序排序。
- 分类卡片内文章预览继续保持发布时间倒序。
- `/categories/:name/` 单分类页文章列表显式按发布时间倒序展示。
- 已更新需求文档确认记录。

## 二、与原开发文档的对照

本次实现与 `docs/requirements/2026-07-05-category-time-desc-sort.md` 一致。

实际开发中未修改文章内容、文章日期、标签页、归档页、首页、构建配置和部署配置。实现方式采用模板内排序，未新增公共能力或第三方依赖。

## 三、影响范围回顾

本次影响文件：

- `themes/chic/layout/category.ejs`
- `themes/chic/layout/_page/category.ejs`
- `docs/requirements/2026-07-05-category-time-desc-sort.md`

本次新增总结文档：

- `docs/reviews/2026-07-05-category-time-desc-sort-summary.md`

影响页面：

- `/category/`
- `/categories/:name/`

## 四、测试情况

已执行：

```bash
npm run build
```

构建成功。

已抽查生成文件：

- `public/category/index.html`：分类顺序为 `2026`、`2025`、`2024`、`2023`、`2022`、`2021`、`2020`、`2019`、`2018`、`开篇`。
- `public/categories/2026/index.html`：文章日期从 `2026-04-20` 开始倒序展示。
- `public/categories/开篇/index.html`：保留最早文章日期 `2018-05-11`。

## 五、遗留问题

- 本次未处理分类模板中既有样式和文案改版带来的历史差异，仅在当前文件基础上补充排序逻辑。
- 本次未处理生成产物 `public/` 是否应提交的问题，仍遵循项目要求，除非部署流程明确需要，不建议提交生成产物。

## 六、经验总结

分类索引页展示分类集合时，按名称排序不一定符合内容时间线。以分类下最新文章日期作为排序依据，可以兼容年份分类和“开篇”这类非年份分类，也避免未来新增非年份分类时出现顺序错位。
