import { useEffect, useRef, useState } from 'react'
import { navItems } from '../data/resume'

/** 区块顶部越过这条线（像素）即视为"当前所在区块" */
const ACTIVATION_OFFSET = 96

export function Nav() {
  const [activeId, setActiveId] = useState<string>(navItems[0].id)

  /**
   * 点击导航后锁住高亮，直到用户真正自行滚动才交还给滚动侦测。
   *
   * 原因：项目默认收起时页面较短，最后两个区块被滚到底部钳制，
   * 会停在同一个滚动位置——仅凭位置无法区分用户点的是哪一个。
   */
  const lockedRef = useRef(false)

  useEffect(() => {
    const updateActive = () => {
      if (lockedRef.current) return

      const doc = document.documentElement
      const canScroll = doc.scrollHeight > window.innerHeight + 2

      // 滚到底时最后一个区块可能永远顶不到激活线，直接判定它为当前区块
      if (
        canScroll &&
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      ) {
        setActiveId(navItems[navItems.length - 1].id)
        return
      }

      let current: string = navItems[0].id
      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
          current = item.id
        }
      }
      setActiveId(current)
    }

    // 只有真实的用户滚动意图才解除锁定（平滑滚动本身不触发这些事件）
    const releaseLock = () => {
      lockedRef.current = false
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    window.addEventListener('wheel', releaseLock, { passive: true })
    window.addEventListener('touchmove', releaseLock, { passive: true })
    window.addEventListener('keydown', releaseLock)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
      window.removeEventListener('wheel', releaseLock)
      window.removeEventListener('touchmove', releaseLock)
      window.removeEventListener('keydown', releaseLock)
    }
  }, [])

  const handleNavClick = (id: string) => {
    lockedRef.current = true
    setActiveId(id)
  }

  return (
    <nav
      aria-label="简历区块导航"
      className="sticky top-0 z-10 border-b border-line bg-page/90 backdrop-blur"
    >
      <ul className="mx-auto flex w-full max-w-[800px] gap-1 overflow-x-auto px-4 sm:gap-2 sm:px-6">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => handleNavClick(item.id)}
                /* 下划线指示当前区块，比填充色药丸更克制 */
                className={`block border-b-2 px-2.5 py-3 text-sm whitespace-nowrap transition-colors sm:px-3.5 ${
                  isActive
                    ? 'border-accent font-medium text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
