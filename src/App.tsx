import { Cover } from './components/Cover'
import { Nav } from './components/Nav'
import { ProjectBlock } from './components/ProjectBlock'
import { Section } from './components/Section'
import { SkillTags } from './components/SkillTags'
import { education, projects, skills, summary } from './data/resume'

function App() {
  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[800px] px-4 pt-8 sm:px-6 sm:pt-12">
        <Cover />
      </div>

      <Nav />

      <main className="mx-auto flex w-full max-w-[800px] flex-col gap-12 px-4 pt-10 pb-20 sm:px-6">
        <Section id="summary" title="个人简介">
          <div className="flex flex-col gap-3">
            {summary.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-8 text-ink">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        <Section id="education" title="教育经历">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-[17px] font-semibold tracking-tight text-ink">
              {education.school}
              <span className="ml-3 font-normal text-muted">
                {education.major}
              </span>
              <span className="ml-2 font-normal text-muted">
                {education.degree}
              </span>
            </h3>
            <p className="shrink-0 text-sm text-muted tabular-nums">
              {education.period}
            </p>
          </div>

          <dl className="mt-4 flex flex-col gap-2.5 text-[15px] leading-8">
            <div className="flex gap-4">
              <dt className="shrink-0 text-muted">证书</dt>
              <dd className="text-ink">
                {education.certificates.join('、')}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="shrink-0 text-muted">课程</dt>
              <dd className="text-ink">{education.courses.join('、')}</dd>
            </div>
          </dl>
        </Section>

        <Section id="skills" title="专业技能">
          <SkillTags groups={skills} />
        </Section>

        <Section id="projects" title="项目经历">
          {/* 手风琴目录：条目自带上下分隔线与内边距，这里不再叠 gap */}
          <div className="flex flex-col">
            {projects.map((project) => (
              <ProjectBlock key={project.name} project={project} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  )
}

export default App
