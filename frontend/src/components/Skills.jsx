import { motion } from 'framer-motion'
import { Code2, Film, Settings } from 'lucide-react'

const GROUPS = [
  {
    icon:  Code2,
    title: 'Development',
    color: 'from-blue-500 to-indigo-600',
    glow:  'rgba(99,102,241,0.35)',
    tags: [
      { name: 'HTML',            level: 95 },
      { name: 'CSS',             level: 90 },
      { name: 'JavaScript',      level: 85 },
      { name: 'React',           level: 82 },
      { name: 'Bootstrap',       level: 88 },
      { name: 'PHP',             level: 70 },
      { name: 'MongoDB',         level: 72 },
      { name: 'MySQL',           level: 75 },
      { name: 'MERN Stack',      level: 78 },
    ],
  },
  {
    icon:  Film,
    title: 'Creative',
    color: 'from-violet-500 to-pink-600',
    glow:  'rgba(167,139,250,0.35)',
    tags: [
      { name: 'Premiere Pro', level: 85 },
      { name: 'After Effects', level: 75 },
      { name: 'Photoshop',    level: 78 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'Figma',        level: 72 },
    ],
  },
  {
    icon:  Settings,
    title: 'Technical',
    color: 'from-emerald-500 to-teal-600',
    glow:  'rgba(16,185,129,0.35)',
    tags: [
      { name: 'PC Repair',          level: 92 },
      { name: 'Windows Install',    level: 95 },
      { name: 'BIOS / Driver Fix',  level: 88 },
      { name: 'SSD / RAM Upgrade',  level: 90 },
      { name: 'Network Setup',      level: 80 },
    ],
  },
]

const Tag = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="space-y-1.5"
  >
    <div className="flex justify-between items-center">
      <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{name}</span>
      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{level}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-slate-200/70 dark:bg-white/8 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-current to-current"
        style={{ background: 'var(--bar-color)' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </motion.div>
)

const Skills = () => (
  <section id="skills" className="section-container">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-20 space-y-4"
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                       bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                       border border-emerald-200/60 dark:border-emerald-500/25">
        Skills
      </span>
      <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}>
        What I{' '}
        <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
          Know
        </span>
      </h2>
    </motion.div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-7">
      {GROUPS.map((group, gi) => {
        const Icon = group.icon
        return (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: gi * 0.15 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-7 space-y-6 group cursor-default
                       hover:shadow-2xl transition-all duration-300"
            style={{ '--glow': group.glow }}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center
                               bg-gradient-to-br ${group.color}
                               shadow-[0_4px_16px_var(--glow)]`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                {group.title}
              </h3>
            </div>

            {/* Progress bars */}
            <div
              className="space-y-4"
              style={{ '--bar-color': `linear-gradient(90deg, ${group.color.includes('blue') ? '#6366f1,#818cf8' : group.color.includes('violet') ? '#8b5cf6,#ec4899' : '#10b981,#14b8a6'})` }}
            >
              {group.tags.map((tag, ti) => (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  level={tag.level}
                  delay={gi * 0.1 + ti * 0.06}
                />
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  </section>
)

export default Skills
