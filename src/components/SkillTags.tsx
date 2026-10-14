import type { SkillGroup } from '../data/resume'

type SkillTagsProps = {
  groups: SkillGroup[]
}

/**
 * 按掌握程度分组的技能标签。
 * 分组标题在左、标签在右形成对齐的标签栏，扫读时能一眼看出层次。
 */
export function SkillTags({ groups }: SkillTagsProps) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div
          key={group.level}
          className="flex flex-col gap-2.5 sm:flex-row sm:gap-6"
        >
          <p className="shrink-0 text-sm text-muted sm:w-14 sm:pt-1.5">
            {group.level}
          </p>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-md bg-tag px-3 py-1.5 text-[13px] leading-5 font-medium text-tag-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
