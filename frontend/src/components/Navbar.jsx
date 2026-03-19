import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { name: 'Home',     href: 'hero' },
  { name: 'About',    href: 'about' },
  { name: 'Skills',   href: 'skills' },
  { name: 'Services', href: 'services' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact',  href: 'contact' },
]

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false)
  const [active,   setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const { darkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = NAV_LINKS.map(({ href }) => {
      const el = document.getElementById(href)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href) },
        { rootMargin: '-35% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    /* Outer wrapper: fixed centering — NO transform from Framer Motion here */
    <div
      className={`
        fixed z-50 top-4 left-0 right-0
        flex justify-center
        px-3 sm:px-4
        transition-all duration-300
        ${scrolled ? 'top-2' : 'top-4'}
      `}
    >
      {/* Inner animated container */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.05 }}
        className={`
          w-full max-w-[94%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[68%]
          rounded-2xl
          backdrop-blur-2xl
          border border-white/50 dark:border-white/10
          transition-all duration-300
          ${scrolled
            ? 'bg-white/92 dark:bg-slate-950/90 shadow-[0_12px_50px_rgba(99,102,241,0.20)]'
            : 'bg-white/75 dark:bg-slate-950/70 shadow-[0_8px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.55)]'
          }
        `}
      >
        {/* ── Top row ── */}
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-5">

          {/* Logo */}
          <a
            href="#hero"
            onClick={() => { setActive('hero'); setIsOpen(false) }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600
                         flex items-center justify-center
                         shadow-[0_4px_14px_rgba(99,102,241,0.5)]"
            >
              <span className="text-white font-black text-xs sm:text-sm"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>AP</span>
            </motion.div>
            <span
              className="font-bold text-base sm:text-[17px] text-slate-800 dark:text-white
                         group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                         transition-colors duration-200"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Amit Patel
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href} className="relative">
                <a
                  href={`#${link.href}`}
                  onClick={() => setActive(link.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
                    ${active === link.href
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400'
                    }`}
                >
                  {link.name}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.88 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl
                         bg-slate-100 dark:bg-white/10 border border-slate-200/70 dark:border-white/10
                         hover:bg-indigo-50 dark:hover:bg-indigo-500/15
                         transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                  exit={{    rotate:  90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {darkMode
                    ? <Sun  size={16} className="text-amber-400" />
                    : <Moon size={16} className="text-slate-600" />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(o => !o)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl
                         bg-slate-100 dark:bg-white/10 border border-slate-200/70 dark:border-white/10
                         transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -80, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  80, opacity: 0 }}
                  transition={{ duration: 0.17 }}
                >
                  {isOpen ? <X size={17} /> : <Menu size={17} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{    opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-1 px-2 pb-4 pt-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={`#${link.href}`}
                      onClick={() => { setActive(link.href); setIsOpen(false) }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                  transition-all duration-200
                        ${active === link.href
                          ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                    >
                      {active === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      )}
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Navbar
