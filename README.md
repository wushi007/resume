# 简历网站

交互式个人简历，用于申请数据开发实习生岗位。

技术栈：React 19 + TypeScript + Vite 8 + Tailwind CSS 4。

## 本地运行

```bash
npm install
npm run dev        # 开发服务器，默认 http://localhost:5173/
npm run build      # 生产构建到 dist/
npm run preview    # 预览生产产物
npm run lint       # oxlint
```

## 目录结构

```
src/
├── App.tsx                  页面组合：Cover + 四个 Section
├── index.css                色板 token（@theme）+ 全局样式
├── data/resume.ts           简历数据 —— 改内容只需要动这个文件
└── components/
    ├── Cover.tsx            顶部报头（姓名 / 求职方向 / 到岗情况）
    ├── Nav.tsx              导航，含滚动侦测与吸顶
    ├── Section.tsx          区块统一布局
    ├── SkillTags.tsx        技能标签，按熟练度分组
    └── ProjectBlock.tsx     项目条目（手风琴：默认收起，点击展开要点）
```

## 改内容

所有简历文案集中在 `src/data/resume.ts`，组件不内联任何文案。改这一个文件即可更新页面。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。

`vite.config.ts` 里设了 `base: './'`，产物使用相对路径，因此无论部署在根路径还是 `/<仓库名>/` 子路径下都能正常加载，不需要因仓库名改动配置。
