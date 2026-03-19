import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, Github, Linkedin } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'

const ROLES = ['Full Stack Developer', 'UI/UX Designer', 'PC Repair Expert', 'Video Editor']

const TECH_TAGS = [
  { label: 'React',    color: 'from-cyan-400 to-blue-500',    deg: 0   },
  { label: 'Node.js',  color: 'from-green-400 to-emerald-600', deg: 90  },
  { label: 'MERN',     color: 'from-violet-400 to-purple-600', deg: 180 },
  { label: 'Design',   color: 'from-pink-400 to-rose-500',     deg: 270 },
]

const STATS = [
  { val: '6+', label: 'Years\nLearning' },
  { val: '10+', label: 'Projects\nBuilt' },
  { val: '4',  label: 'Core\nServices' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
  const typedRole = useTypewriter(ROLES, 110)

  return (
    <section
      id="hero"
      className="section-container min-h-screen flex items-center justify-center pt-24"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── LEFT ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-7 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="pill">
              <Sparkles size={11} className="text-indigo-400" />
              Available for freelance work
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="space-y-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              Hello, I&apos;m
            </p>
            <h1
              className="font-black leading-[0.92] tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3.5rem, 9vw, 5.5rem)' }}
            >
              <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600
                               bg-clip-text text-transparent">
                Amit
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">Patel</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="h-8 flex items-center justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 text-[17px] font-semibold
                            text-indigo-600 dark:text-indigo-400">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shrink-0" />
              {typedRole}
              <span className="opacity-80 animate-pulse">|</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400
                       max-w-[420px] mx-auto lg:mx-0"
          >
            Building modern web experiences &amp; technical solutions.
            Founder of{' '}
            <span className="text-indigo-500 font-semibold">AmitSolutionHub</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary"
            >
              View Projects
              <ArrowRight size={15} />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-secondary"
            >
              <Download size={15} />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social + stats */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-6 pt-2"
          >
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github,   href: 'https://github.com/',    label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/amit-patel-89736b287/', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             glass border border-white/50 dark:border-white/10
                             text-slate-600 dark:text-slate-300
                             hover:text-indigo-600 dark:hover:text-indigo-400
                             hover:border-indigo-300 dark:hover:border-indigo-500/40
                             transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10" />

            {/* Stats */}
            <div className="flex gap-6">
              {STATS.map(s => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-black text-2xl text-indigo-600 dark:text-indigo-400"
                       style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {s.val}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-500 leading-tight whitespace-pre-line">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT – orbit visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">

            {/* Outer decorative ring */}
            <div className="absolute inset-0 rounded-full border border-indigo-400/15" />
            <div
              className="absolute inset-4 rounded-full border border-dashed border-indigo-400/20 animate-spin"
              style={{ animationDuration: '22s' }}
            />

            {/* Orbiting tech tags */}
            {TECH_TAGS.map((tag, i) => {
              const rad = (tag.deg * Math.PI) / 180
              const r   = 130
              const x   = Math.cos(rad) * r
              const y   = Math.sin(rad) * r
              return (
                <motion.div
                  key={tag.label}
                  className="absolute"
                  style={{
                    left: '50%',
                    top:  '50%',
                    translateX: `calc(-50% + ${x}px)`,
                    translateY: `calc(-50% + ${y}px)`,
                  }}
                  animate={{
                    translateX: [`calc(-50% + ${x}px)`, `calc(-50% + ${x}px)`],
                    translateY: [`calc(-50% + ${y}px)`, `calc(-50% + ${y - 6}px)`, `calc(-50% + ${y}px)`],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4,
                  }}
                >
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold text-white
                                    bg-gradient-to-r ${tag.color}
                                    shadow-[0_4px_14px_rgba(0,0,0,0.2)]
                                    whitespace-nowrap`}>
                    {tag.label}
                  </span>
                </motion.div>
              )
            })}

            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-indigo-500/15 blur-3xl pulse-glow" />

            {/* Center avatar card */}
            <motion.div
              className="absolute inset-16 glass rounded-3xl flex flex-col items-center justify-center gap-2.5
                         shadow-[0_8px_32px_rgba(99,102,241,0.2)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600
                              flex items-center justify-center
                              shadow-[0_4px_20px_rgba(99,102,241,0.4)]">
                <span className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>AP</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-[13px] text-slate-800 dark:text-white leading-tight">Amit Patel</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">B.Tech IT</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
