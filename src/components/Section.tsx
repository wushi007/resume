import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
}

/**
 * 统一区块布局：标题 + 一条延伸到底的细线。
 * 细线不是装饰，它标出区块边界，替代"每个区块套一张卡片"的做法。
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20">
      <div className="flex items-center gap-5">
        <h2
          id={headingId}
          className="text-xl font-semibold tracking-tight text-ink"
        >
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}
