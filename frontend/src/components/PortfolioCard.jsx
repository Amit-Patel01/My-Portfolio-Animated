import { motion } from 'framer-motion'
import { ExternalLink, Github, Award, Trash2 } from 'lucide-react'

const PortfolioCard = ({ item, index, onDelete, isCustom }) => {
  const isProject = item.type === 'project'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      layout
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl overflow-hidden group h-full flex flex-col
                   hover:shadow-[0_24px_60px_rgba(99,102,241,0.18)]
                   dark:hover:shadow-[0_24px_60px_rgba(99,102,241,0.25)]
                   transition-shadow duration-300"
      >
        {/* ── Image ── */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop' }}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top color strip */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color || 'from-indigo-500 to-violet-600'}`} />

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white
                              ${isProject
                                ? 'bg-indigo-600/90 backdrop-blur-sm'
                                : 'bg-pink-600/90 backdrop-blur-sm'
                              }`}>
              {isProject ? <Github size={10} /> : <Award size={10} />}
              {isProject ? 'Project' : 'Certificate'}
            </span>
          </div>

          {/* Delete button for custom items */}
          {isCustom && onDelete && (
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(item.id) }}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
                         rounded-lg bg-red-500/80 backdrop-blur-sm text-white
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-red-600"
            >
              <Trash2 size={12} />
            </button>
          )}

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center gap-2
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.link && item.link !== '#' && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white
                           bg-white/20 backdrop-blur-md border border-white/30
                           hover:bg-white/30 transition-colors duration-200"
              >
                <ExternalLink size={12} />
                {isProject ? 'Visit' : 'View Cert'}
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white
                           bg-white/20 backdrop-blur-md border border-white/30
                           hover:bg-white/30 transition-colors duration-200"
              >
                <Github size={12} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-1 space-y-3">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[15px] text-slate-800 dark:text-white leading-snug"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              {item.title}
            </h3>
            {(item.link && item.link !== '#') && (
              <ExternalLink size={14}
                className="text-slate-400 group-hover:text-indigo-500 shrink-0 mt-0.5
                           transition-colors duration-200" />
            )}
          </div>

          {/* Meta: issuer + date for certs */}
          {!isProject && (item.issuer || item.date) && (
            <p className="text-[11px] font-semibold text-indigo-500 dark:text-indigo-400">
              {item.issuer}{item.issuer && item.date ? ' · ' : ''}{item.date}
            </p>
          )}

          {/* Description */}
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 flex-1">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium
                           bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400
                           border border-slate-200/80 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PortfolioCard
