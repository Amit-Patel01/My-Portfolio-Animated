import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.6, y: 20  }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-50
                     w-11 h-11 flex items-center justify-center rounded-2xl
                     bg-gradient-to-br from-indigo-500 to-violet-600
                     text-white
                     shadow-[0_4px_24px_rgba(99,102,241,0.5)]
                     hover:shadow-[0_6px_32px_rgba(99,102,241,0.7)]
                     transition-shadow duration-200"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
