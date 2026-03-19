import { motion } from 'framer-motion'
import { Code, Hammer, GraduationCap, Rocket } from 'lucide-react'

const MILESTONES = [
  {
    icon:  Code,
    year:  '2018',
    title: 'Started Learning',
    desc:  'Began web development journey through YouTube tutorials and self-study.',
    color: 'from-blue-500 to-indigo-600',
    glow:  'rgba(99,102,241,0.4)',
  },
  {
    icon:  Hammer,
    year:  '2020',
    title: 'PC Repair',
    desc:  'Expanded into hardware troubleshooting, OS installation, and network setup.',
    color: 'from-emerald-500 to-teal-600',
    glow:  'rgba(16,185,129,0.4)',
  },
  {
    icon:  GraduationCap,
    year:  '2023',
    title: 'B.Tech IT',
    desc:  'Enrolled in Information Technology at Parul University — deepening CS fundamentals.',
    color: 'from-violet-500 to-purple-600',
    glow:  'rgba(139,92,246,0.4)',
  },
  {
    icon:  Rocket,
    year:  '2026',
    title: 'AmitSolutionHub',
    desc:  'Founded a technical services platform offering web dev, design, and PC support.',
    color: 'from-orange-500 to-red-500',
    glow:  'rgba(249,115,22,0.4)',
  },
]

const Journey = () => (
  <section id="journey" className="section-container">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-20 space-y-4"
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                       bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400
                       border border-indigo-200/60 dark:border-indigo-500/25">
        Journey
      </span>
      <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}>
        My{' '}
        <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
          Timeline
        </span>
      </h2>
    </motion.div>

    {/* Timeline */}
    <div className="max-w-3xl mx-auto relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b
                      from-indigo-400/60 via-violet-400/40 to-transparent
                      hidden sm:block" />

      <div className="space-y-8">
        {MILESTONES.map((m, i) => {
          const Icon = m.icon
          return (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative sm:pl-20"
            >
              {/* Icon bubble on line */}
              <div
                className={`hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-2xl
                             items-center justify-center shrink-0
                             bg-gradient-to-br ${m.color}
                             shadow-[0_4px_18px_var(--glow)]`}
                style={{ '--glow': m.glow }}
              >
                <Icon size={20} className="text-white" />
              </div>

              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-3xl p-6 flex items-center gap-5 group
                           hover:shadow-xl transition-all duration-300"
              >
                {/* Mobile icon */}
                <div
                  className={`sm:hidden flex items-center justify-center w-11 h-11 rounded-2xl shrink-0
                               bg-gradient-to-br ${m.color}`}
                >
                  <Icon size={18} className="text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full text-white
                                      bg-gradient-to-r ${m.color}`}>
                      {m.year}
                    </span>
                    <h3 className="font-bold text-base text-slate-800 dark:text-white"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
)

export default Journey
