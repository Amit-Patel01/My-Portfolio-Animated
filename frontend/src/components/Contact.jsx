import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, Send, Linkedin, Youtube,
  Facebook, Instagram, Code2, BookOpen, Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'

const CONTACT_INFO = [
  { icon: Mail,  label: 'amitpatel07029@gmail.com', href: 'mailto:amitpatel07029@gmail.com' },
  { icon: Phone, label: '+91 78742 48481',           href: 'tel:+917874248481' },
]

const SOCIALS = [
  { icon: Linkedin,  name: 'LinkedIn',      url: 'https://www.linkedin.com/in/amit-patel-89736b287/', color: 'hover:text-blue-600  hover:border-blue-300  dark:hover:border-blue-500/40' },
  { icon: Youtube,   name: 'YouTube',       url: 'https://youtube.com/@amitpatel-uc7up',              color: 'hover:text-red-500   hover:border-red-300   dark:hover:border-red-500/40'  },
  { icon: Facebook,  name: 'Facebook',      url: 'https://www.facebook.com/people/Amit-Patel/',       color: 'hover:text-blue-500  hover:border-blue-300  dark:hover:border-blue-500/40' },
  { icon: Instagram, name: 'Instagram',     url: 'https://www.instagram.com/amiitt_4084',             color: 'hover:text-pink-500  hover:border-pink-300  dark:hover:border-pink-500/40'  },
  { icon: Code2,     name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user/amitpatel07/',   color: 'hover:text-green-500 hover:border-green-300 dark:hover:border-green-500/40' },
  { icon: BookOpen,  name: 'LeetCode',      url: 'https://leetcode.com/u/AmitPatel4084/',             color: 'hover:text-orange-500 hover:border-orange-300 dark:hover:border-orange-500/40' },
]

const INPUT_CLS = `w-full px-4 py-3.5 rounded-xl text-sm font-medium
  bg-white/70 dark:bg-white/5
  border border-slate-200/80 dark:border-white/10
  text-slate-800 dark:text-slate-200
  placeholder:text-slate-400 dark:placeholder:text-slate-600
  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
  focus:border-indigo-400 dark:focus:border-indigo-500
  transition-all duration-200`

const Contact = () => {
  const [form,      setForm]      = useState({ name: '', email: '', message: '' })
  const [loading,   setLoading]   = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/contact`
      const res = await fetch(apiUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Message sent! I\'ll get back to you soon.')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error()
      }
    } catch {
      toast.error('Couldn\'t send — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-container">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 space-y-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                         bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400
                         border border-orange-200/60 dark:border-orange-500/25">
          Contact
        </span>
        <h2 className="font-black text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
          Let&apos;s{' '}
          <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
            Work Together
          </span>
        </h2>
        <p className="max-w-xl mx-auto text-[15px] text-slate-600 dark:text-slate-400">
          Have a project in mind or need technical support? Drop me a message and I&apos;ll respond within 24 hours.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Left — info + socials */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="space-y-6"
        >
          {/* Contact info */}
          <div className="glass rounded-3xl p-7 space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-5"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              Get In Touch
            </h3>
            {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3.5 rounded-2xl group
                           hover:bg-indigo-50 dark:hover:bg-indigo-500/8
                           transition-all duration-200"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-xl
                                 bg-indigo-100 dark:bg-indigo-500/15
                                 text-indigo-600 dark:text-indigo-400 shrink-0
                                 group-hover:scale-110 transition-transform duration-200">
                  <Icon size={17} />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300
                                 group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                 transition-colors duration-200">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Socials */}
          <div className="glass rounded-3xl p-7">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-5"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              Find Me Online
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {SOCIALS.map(({ icon: Icon, name, url, color }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl
                              bg-white/60 dark:bg-white/5
                              border border-slate-200/70 dark:border-white/8
                              text-slate-600 dark:text-slate-400
                              transition-all duration-200 ${color}`}
                >
                  <Icon size={20} />
                  <span className="text-[11px] font-medium text-center leading-tight">{name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="glass rounded-3xl p-7 h-full">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-7"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-500 mb-1.5 ml-1">
                  Your Name
                </label>
                <input
                  name="name"
                  placeholder="Amit Patel"
                  value={form.name}
                  onChange={handleChange}
                  className={INPUT_CLS}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-500 mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={INPUT_CLS}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-500 mb-1.5 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project or question…"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className={`${INPUT_CLS} resize-none`}
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{   scale: loading ? 1 : 0.97 }}
                className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  : <><Send size={15} /> Send Message</>
                }
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Contact
