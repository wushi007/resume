import { availability, profile } from '../data/resume'

export function Cover() {
  return (
    <header className="rounded-xl border border-line bg-surface px-7 py-8 sm:px-12 sm:py-11">
      {/* 报头：姓名与求职岗位用同一套「小号灰标签 + 值」结构对称排布；
          姓名是整页唯一的超大字号，与其余内容拉开层级 */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <p className="text-xs tracking-wide text-muted">姓名</p>
          <h1 className="mt-1.5 text-[34px] leading-none font-semibold tracking-tight text-ink sm:text-[44px]">
            {profile.name}
          </h1>
        </div>

        <div>
          <p className="text-xs tracking-wide text-muted">求职岗位</p>
          <p className="mt-1.5 text-[15px] font-medium tracking-wide text-accent">
            {profile.target}
          </p>
        </div>
      </div>

      {/* 页面公开部署，不公布电话与邮箱；联系方式在投递时另行提供 */}
      <div className="mt-8 border-t border-line pt-7">
        <p className="text-xs tracking-wide text-muted">到岗情况</p>
        <p className="mt-1.5 text-[15px] text-ink">{availability}</p>
      </div>
    </header>
  )
}
