import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink, Code, Film, MonitorPlay } from 'lucide-react'

const VIDEOS = [
  {
    id: 1,
    type: 'video',
    title: 'Cinematic Wedding Highlights',
    description: 'Professionally edited wedding highlight reel with color grading and motion graphics',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
    videoUrl: '',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading']
  },
  {
    id: 2,
    type: 'video',
    title: 'YouTube Intro Animation',
    description: 'Custom animated intro for YouTube content creators',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop',
    videoUrl: '',
    tags: ['After Effects', 'MoGraph', 'Sound Design']
  },
  {
    id: 3,
    type: 'video',
    title: 'Product Promotional Video',
    description: 'Marketing video with motion graphics and kinetic typography',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop',
    videoUrl: '',
    tags: ['Premiere Pro', 'Motion Graphics', 'Editing']
  }
]

const DEVELOPMENT_SHOWCASE = [
  {
    id: 1,
    type: 'dev',
    title: 'AmitSolutionHub',
    description: 'Full-stack technical services platform with booking system',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    link: '#',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    type: 'dev',
    title: 'PhotoFrame Hub',
    description: 'Creative canvas-based photo frame editor',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944b3?w=800&auto=format&fit=crop',
    link: 'https://photoframehub.github.io/Photoframe/',
    tech: ['HTML5 Canvas', 'JavaScript']
  }
]

const VideoCarousel = ({ items, type, onPreview }) => {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  const next = () => setCurrent(c => (c + 1) % items.length)
  const prev = () => setCurrent(c => (c - 1 + items.length) % items.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Main display */}
      <div className="relative aspect-video bg-slate-900/50">
        <img
          src={items[current].thumbnail}
          alt={items[current].title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <div className="flex gap-2">
            {items[current].tags?.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white/90 bg-white/20 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {items[current].title}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2">{items[current].description}</p>
        </div>

        {/* Play button */}
        {type === 'video' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-16 h-16 flex items-center justify-center rounded-full
                       bg-white/20 backdrop-blur-md border border-white/30
                       text-white hover:bg-white/30 transition-all"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </motion.button>
        )}

        {/* Development link */}
        {type === 'dev' && items[current].link && (
          <motion.a
            href={items[current].link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       px-5 py-2.5 flex items-center gap-2 rounded-xl
                       bg-white/20 backdrop-blur-md border border-white/30
                       text-white hover:bg-white/30 transition-all"
          >
            <ExternalLink size={16} />
            Live Preview
          </motion.a>
        )}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                   rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white
                   hover:bg-white/20 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                   rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white
                   hover:bg-white/20 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute top-4 right-4 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'w-6 bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const VideoShowcase = () => {
  const [activeType, setActiveType] = useState('video')

  return (
    <section id="showcase" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                         bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-600 dark:text-pink-400
                         border border-pink-200/60 dark:border-pink-500/25">
          Showcase
        </span>
        <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
          My{' '}
          <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent">
            Work
          </span>
        </h2>
      </motion.div>

      {/* Type switching */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-sm">
          <button
            onClick={() => setActiveType('video')}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeType === 'video'
                ? 'text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {activeType === 'video' && (
              <motion.span
                layoutId="showcase-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 shadow-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Film size={16} className="relative z-10" />
            <span className="relative z-10">Video Editing</span>
          </button>
          <button
            onClick={() => setActiveType('dev')}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeType === 'dev'
                ? 'text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {activeType === 'dev' && (
              <motion.span
                layoutId="showcase-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Code size={16} className="relative z-10" />
            <span className="relative z-10">Development</span>
          </button>
        </div>
      </div>

      {/* Showcase content */}
      <motion.div
        key={activeType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {activeType === 'video' ? (
          <VideoCarousel items={VIDEOS} type="video" />
        ) : (
          <VideoCarousel items={DEVELOPMENT_SHOWCASE} type="dev" />
        )}
      </motion.div>
    </section>
  )
}

export default VideoShowcase