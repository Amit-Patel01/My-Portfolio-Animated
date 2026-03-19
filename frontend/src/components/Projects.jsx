import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Code2, Award, Loader2 } from 'lucide-react'
import PortfolioCard from './PortfolioCard'
import { usePortfolio } from '../hooks/usePortfolio'

const TABS = [
  { key: 'all',         label: 'All',          icon: LayoutGrid },
  { key: 'project',     label: 'Projects',     icon: Code2 },
  { key: 'certificate', label: 'Certificates', icon: Award },
]

const Projects = () => {
  const { items, loading, error } = usePortfolio()
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? items
    : items.filter(i => i.type === activeTab)

  return (
    <section id="projects" className="section-container">

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                         tracking-widest uppercase
                         bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400
                         border border-pink-200/60 dark:border-pink-500/25">
          Portfolio
        </span>
        <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
          Projects &amp;{' '}
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Certificates
          </span>
        </h2>
        <p className="max-w-xl mx-auto text-[15px] text-slate-600 dark:text-slate-400">
          A showcase of my work and earned certifications.
        </p>
      </motion.div>

      {/* ── Filter tabs ── */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl
                        bg-white/60 dark:bg-white/5
                        border border-white/60 dark:border-white/10
                        backdrop-blur-sm">
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                            transition-colors duration-200
                  ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-white/10
                               shadow-sm border border-indigo-100 dark:border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{label}</span>
                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md font-bold
                  ${isActive
                    ? 'bg-indigo-100 dark:bg-indigo-500/25 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-500'
                  }`}>
                  {key === 'all' ? items.length : items.filter(i => i.type === key).length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="py-20 text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-indigo-500 mb-3" />
          <p className="text-sm text-slate-500">Loading portfolio…</p>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="py-16 text-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* ── Cards grid ── */}
      {!loading && !error && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0
              ? filtered.map((item, i) => (
                  <PortfolioCard key={item.id} item={item} index={i} />
                ))
              : (
                <div className="col-span-full py-20 text-center text-slate-500 dark:text-slate-600">
                  <LayoutGrid size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No items found in this category.</p>
                </div>
              )
            }
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  )
}

export default Projects
