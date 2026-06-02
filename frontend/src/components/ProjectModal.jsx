import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Award, Calendar, Tag } from 'lucide-react'

const ProjectModal = ({ item, isOpen, onClose }) => {
  if (!item) return null

  const isProject = item.type === 'project'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-10 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-auto
                            glass rounded-3xl shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
                           rounded-xl bg-white/20 backdrop-blur-sm text-white/70 hover:text-white
                           hover:bg-white/30 transition-all"
              >
                <X size={20} />
              </button>

              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white
                                    ${isProject ? 'bg-indigo-600/90' : 'bg-pink-600/90'} backdrop-blur-sm`}>
                    {isProject ? <Github size={14} /> : <Award size={14} />}
                    {isProject ? 'Project' : 'Certificate'}
                  </span>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color || 'from-indigo-500 to-violet-600'}`} />
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2"
                      style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {item.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    {!isProject && item.issuer && (
                      <span className="flex items-center gap-1.5">
                        <Award size={14} />
                        {item.issuer}
                      </span>
                    )}
                    {!isProject && item.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {item.date}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag size={12} /> Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium
                                   bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400
                                   border border-indigo-100 dark:border-indigo-500/25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200/50 dark:border-white/10">
                  {item.link && item.link !== '#' && (
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                                 bg-gradient-to-r from-indigo-500 to-violet-600
                                 shadow-[0_4px_20px_rgba(99,102,241,0.4)]
                                 hover:shadow-[0_6px_28px_rgba(99,102,241,0.6)]"
                    >
                      <ExternalLink size={15} />
                      {isProject ? 'View Project' : 'View Certificate'}
                    </motion.a>
                  )}
                  {item.github && (
                    <motion.a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                                 text-slate-700 dark:text-slate-200
                                 bg-white/80 dark:bg-white/10
                                 border border-slate-200/80 dark:border-white/15
                                 hover:bg-white dark:hover:bg-white/15"
                    >
                      <Github size={15} />
                      View Source
                    </motion.a>
                  )}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                               text-slate-600 dark:text-slate-300
                               bg-slate-100/80 dark:bg-white/5
                               border border-slate-200/80 dark:border-white/10
                               hover:bg-slate-200/80 dark:hover:bg-white/10"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal