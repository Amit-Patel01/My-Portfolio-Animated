import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Skills      from './components/Skills'
import Services    from './components/Services'
import Journey     from './components/Journey'
import Projects    from './components/Projects'
import Contact     from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import AdminPanel  from './pages/AdminPanel'

/* ── Portfolio (main site) ── */
const Portfolio = () => {
  useEffect(() => {
    document.title = 'Amit Patel | Full Stack Developer'
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden
                    bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-100/80
                    dark:from-[#08091a] dark:via-[#0d0f2b] dark:to-[#0a0c1e]
                    text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[700px] h-[700px] bg-violet-400/15 dark:bg-violet-700/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-400/15 dark:bg-blue-800/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Services />
        <Journey />
        <Projects />
        <Contact />
        <ScrollToTop />
      </div>
    </div>
  )
}

/* ── Root App with Router ── */
const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/"      element={<Portfolio />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background:    'rgba(15,15,35,0.9)',
          backdropFilter: 'blur(20px)',
          border:        '1px solid rgba(255,255,255,0.1)',
          color:         '#e2e8f0',
          borderRadius:  '16px',
        },
      }}
    />
  </ThemeProvider>
)

export default App
