import { motion } from 'framer-motion'
import { Code, Palette, Laptop2, Video, GraduationCap, Zap } from 'lucide-react'

const CARDS = [
  { icon: Code,     label: 'Web Dev',   desc: 'Modern responsive websites',  color: 'text-blue-500',   glow: 'group-hover:shadow-blue-500/20'   },
  { icon: Palette,  label: 'UI Design', desc: 'Beautiful interfaces',         color: 'text-violet-500', glow: 'group-hover:shadow-violet-500/20' },
  { icon: Laptop2,  label: 'Tech Help', desc: 'Hardware & software fixes',    color: 'text-emerald-500',glow: 'group-hover:shadow-emerald-500/20'},
  { icon: Video,    label: 'Video',     desc: 'Professional edits',           color: 'text-orange-500', glow: 'group-hover:shadow-orange-500/20' },
]

const HIGHLIGHTS = [
  { icon: GraduationCap, text: 'B.Tech IT — Parul University' },
  { icon: Code,          text: 'Full Stack MERN Development' },
  { icon: Palette,       text: 'UI/UX Design & Web Experiences' },
  { icon: Laptop2,       text: 'PC & Laptop Repair Specialist' },
  { icon: Video,         text: 'Video Editing & Content Creation' },
  { icon: Zap,           text: 'Founder — AmitSolutionHub' },
]

const fadeSlide = (dir = 1) => ({
  hidden: { opacity: 0, x: dir * 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
})

const About = () => (
  <section id="about" className="section-container">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-20 space-y-4"
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                       bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400
                       border border-blue-200/60 dark:border-blue-500/25">
        About Me
      </span>
      <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}>
        Who am{' '}
        <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">I?</span>
      </h2>
      <p className="max-w-2xl mx-auto text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
        I&apos;m Amit Patel — a passionate IT student, developer, and problem-solver. I help individuals
        and small businesses build responsive websites and reliable technical solutions.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-14 items-center">

      {/* Left – highlights list */}
      <motion.div
        variants={fadeSlide(-1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
          My Journey
        </h3>
        {HIGHLIGHTS.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-3 p-3.5 rounded-2xl
                       bg-white/60 dark:bg-white/5
                       border border-white/60 dark:border-white/10
                       backdrop-blur-sm
                       hover:bg-indigo-50 dark:hover:bg-indigo-500/8
                       hover:border-indigo-200 dark:hover:border-indigo-500/25
                       transition-all duration-200 group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-xl
                             bg-indigo-100 dark:bg-indigo-500/15
                             text-indigo-600 dark:text-indigo-400 shrink-0
                             group-hover:scale-110 transition-transform duration-200">
              <Icon size={15} />
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Right – glass cards grid */}
      <motion.div
        variants={fadeSlide(1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4"
      >
        {CARDS.map(({ icon: Icon, label, desc, color, glow }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`glass p-6 rounded-3xl text-center space-y-3 cursor-default group
                        hover:shadow-2xl ${glow} transition-all duration-300`}
          >
            <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center
                             bg-white/80 dark:bg-white/8 ${color}
                             group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={22} />
            </div>
            <h4 className="font-bold text-base text-slate-800 dark:text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              {label}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
)

export default About
