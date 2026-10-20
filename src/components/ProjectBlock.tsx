import { useId, useState } from 'react'
import type { Project } from '../data/resume'

type ProjectBlockProps = {
  project: Project
}

/**
 * 单个项目，手风琴条目：默认收起，只露项目名与技术栈（充当目录），
 * 点击整行展开该项目的要点明细。
 *
 * 不渲染任何时间字段——数据层就没有该字段。
 * 技术栈缺省时该行不出现。
 */
export function ProjectBlock({ project }: ProjectBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  return (
    <article className="border-t border-line first:border-t-0">
      {/* 展开按钮与仓库链接是并列的两个交互区，不能互相嵌套 */}
      <div className="flex items-start gap-4 px-3 py-5">
        <h3 className="min-w-0 flex-1">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setIsOpen((open) => !open)}
            className="group flex w-full items-start justify-between gap-6 rounded-md text-left transition-colors hover:bg-page"
          >
            <span className="flex flex-col gap-1.5">
              <span className="text-[17px] font-semibold tracking-tight text-ink">
                {project.name}
              </span>
              {project.stack && (
                /* 技术栈用同一行的顿号分隔文本，不再堆一排灰边小方框 */
                <span className="text-[13px] leading-6 tracking-wide text-muted">
                  {project.stack.join('、')}
                </span>
              )}
            </span>

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className={`mt-2 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:text-ink motion-reduce:transition-none ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M5 8l5 5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </h3>

        {/* 固定宽度占位，保证有/无仓库链接的行折角图标纵向对齐 */}
        <div className="flex w-20 shrink-0 justify-end">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`查看「${project.name}」项目详细（新窗口打开）`}
              className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] leading-5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              详细
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3 w-3"
              >
                <path
                  d="M5 11L11 5M6 5h5v5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* 0fr → 1fr 的纯 CSS 展开，无需 JS 量高度 */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3.5 px-3 pt-1 pb-6">
            {project.bullets.map((bullet) => (
              <li
                key={bullet.label}
                className="flex gap-3 text-[15px] leading-7 text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                />
                <p>
                  <strong className="font-semibold">{bullet.label}：</strong>
                  {bullet.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
