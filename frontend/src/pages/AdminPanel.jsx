import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  LayoutDashboard, Plus, Pencil, Trash2, X, Save, Loader2,
  Code2, Award, ExternalLink, ArrowLeft, Search, LayoutGrid,
  ImageIcon, Link2, Tag, Star, Lock, Eye, EyeOff, LogOut, ShieldCheck,
} from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

/* ─────────────────────────────────────────────
   🔐 CHANGE PASSWORD HERE
───────────────────────────────────────────── */
const ADMIN_PASSWORD = 'amit@admin2024'
const SESSION_KEY    = 'ap_admin_auth'

/* ── Shared input style ── */
const INP = `w-full px-3.5 py-2.5 rounded-xl text-sm
  bg-white dark:bg-white/5
  border border-slate-200 dark:border-white/10
  text-slate-800 dark:text-slate-200
  placeholder:text-slate-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400
  transition-all duration-200`

const EMPTY = {
  type: 'project', title: '', description: '', image: '',
  link: '', github: '', issuer: '', date: '', tags: '', featured: false,
}

/* ══════════════════════════════════════════
   🔒 LOGIN SCREEN
══════════════════════════════════════════ */
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [show,     setShow]     = useState(false)
  const [error,    setError]    = useState(false)
  const [shaking,  setShaking]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onLogin()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setTimeout(() => setError(false), 2500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100
                    dark:from-[#08091a] dark:via-[#0d0f2b] dark:to-[#0a0c1e] px-4">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-400/20 dark:bg-violet-700/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <motion.div
          animate={shaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#0f1022]
                     border border-slate-200/80 dark:border-white/10
                     rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.12)]
                     dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)]
                     overflow-hidden"
        >
          {/* Top gradient strip */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

          <div className="p-8">
            {/* Icon + heading */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl
                              bg-gradient-to-br from-indigo-500 to-violet-600
                              flex items-center justify-center
                              shadow-[0_8px_24px_rgba(99,102,241,0.4)]">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="font-black text-2xl text-slate-900 dark:text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                Admin Access
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                Enter password to manage your portfolio
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                  placeholder="Enter admin password"
                  autoFocus
                  className={`${INP} pr-11 ${error
                    ? 'border-red-400 dark:border-red-500 focus:ring-red-400/30 focus:border-red-400'
                    : ''}`}
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                             text-slate-400 hover:text-slate-600 dark:hover:text-slate-300
                             transition-colors duration-200">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-500 font-medium flex items-center gap-1.5">
                    <X size={12} /> Incorrect password. Try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                           text-sm font-bold text-white
                           bg-gradient-to-r from-indigo-500 to-violet-600
                           hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)]
                           transition-all duration-200">
                <ShieldCheck size={16} /> Unlock Dashboard
              </button>
            </form>

            {/* Back link */}
            <div className="mt-6 text-center">
              <Link to="/"
                className="text-xs text-slate-400 hover:text-indigo-500 transition-colors duration-200 flex items-center justify-center gap-1.5">
                <ArrowLeft size={12} /> Back to Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── Stat card ── */
const Stat = ({ label, value, icon: Icon, color }) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl border bg-white dark:bg-white/5
                  border-slate-200 dark:border-white/10 shadow-sm">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
)

/* ── Form modal ── */
const ItemForm = ({ initial, onSave, onClose, saving }) => {
  const [form, setForm] = useState(
    initial
      ? { ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : initial.tags }
      : EMPTY
  )
  const isEdit = !!initial

  const set = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = e => {
    e.preventDefault()
    if (!form.title || !form.description) { toast.error('Title & description required.'); return }
    onSave({
      ...form,
      tags: typeof form.tags === 'string'
        ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
        : form.tags,
    })
  }

  return (
    <>
      <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{    opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="fixed inset-x-4 top-[3%] md:inset-auto md:left-1/2 md:-translate-x-1/2
                   md:w-[580px] z-50 max-h-[94vh] overflow-y-auto rounded-3xl
                   bg-white dark:bg-[#0f1022]
                   border border-slate-200 dark:border-white/10
                   shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/8">
          <h3 className="font-black text-lg text-slate-900 dark:text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
            {isEdit ? '✏️ Edit Item' : '➕ Add New Item'}
          </h3>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl
                       bg-slate-100 dark:bg-white/8 text-slate-500
                       hover:bg-slate-200 dark:hover:bg-white/15 transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="flex gap-2">
            {['project', 'certificate'].map(t => (
              <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                            text-sm font-semibold border transition-all duration-200
                  ${form.type === t
                    ? 'bg-indigo-50 dark:bg-indigo-500/15 border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500'
                  }`}>
                {t === 'project' ? <Code2 size={14} /> : <Award size={14} />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Title *</label>
            <input name="title" value={form.title} onChange={set} placeholder="My Awesome Project" className={INP} required />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={set}
              placeholder="Short description…" rows={3} className={`${INP} resize-none`} required />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              <ImageIcon size={11} /> Image URL
            </label>
            <input name="image" value={form.image} onChange={set} placeholder="https://images.unsplash.com/…" className={INP} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                <Link2 size={11} /> Live Link
              </label>
              <input name="link" value={form.link} onChange={set} placeholder="https://…" className={INP} />
            </div>
            {form.type === 'project' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">GitHub URL</label>
                <input name="github" value={form.github} onChange={set} placeholder="https://github.com/…" className={INP} />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Issuer</label>
                <input name="issuer" value={form.issuer} onChange={set} placeholder="Udemy, freeCodeCamp…" className={INP} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                <Tag size={11} /> Tags <span className="font-normal">(comma-sep)</span>
              </label>
              <input name="tags" value={form.tags} onChange={set} placeholder="React, Node.js…" className={INP} />
            </div>
            {form.type === 'certificate' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Year Earned</label>
                <input name="date" value={form.date} onChange={set} placeholder="2024" className={INP} />
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`relative w-10 h-5 rounded-full transition-colors duration-200
                             ${form.featured ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={set} className="sr-only" />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow
                               transition-transform duration-200 ${form.featured ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Star size={13} className="text-amber-400" /> Mark as Featured
            </span>
          </label>

          <button type="submit" disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       text-sm font-bold text-white
                       bg-gradient-to-r from-indigo-500 to-violet-600
                       hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)]
                       disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200">
            {saving
              ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
              : <><Save size={15} /> {isEdit ? 'Save Changes' : 'Add Item'}</>
            }
          </button>
        </form>
      </motion.div>
    </>
  )
}

/* ── Row card ── */
const ItemRow = ({ item, onEdit, onDelete }) => (
  <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-4 p-4 rounded-2xl
               bg-white dark:bg-white/5
               border border-slate-200 dark:border-white/8
               hover:border-indigo-200 dark:hover:border-indigo-500/30
               hover:shadow-sm transition-all duration-200 group">

    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-white/10">
      <img src={item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200'}
        alt={item.title} className="w-full h-full object-cover"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200' }} />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
          ${item.type === 'project'
            ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
            : 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400'}`}>
          {item.type === 'project' ? 'Project' : 'Certificate'}
        </span>
        {item.featured && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                           bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            ⭐ Featured
          </span>
        )}
      </div>
      <p className="mt-1 font-bold text-sm text-slate-800 dark:text-white truncate">{item.title}</p>
      <p className="text-xs text-slate-500 dark:text-slate-500 truncate mt-0.5">{item.description}</p>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {item.tags?.slice(0, 3).map(t => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-md
                                   bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">{t}</span>
        ))}
        {item.tags?.length > 3 && <span className="text-[10px] text-slate-400">+{item.tags.length - 3}</span>}
      </div>
    </div>

    <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {item.link && item.link !== '#' && (
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-lg
                     bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-indigo-500 transition-colors">
          <ExternalLink size={14} />
        </a>
      )}
      <button onClick={() => onEdit(item)}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-indigo-50 dark:bg-indigo-500/15 text-indigo-500
                   hover:bg-indigo-100 dark:hover:bg-indigo-500/25 transition-colors">
        <Pencil size={14} />
      </button>
      <button onClick={() => onDelete(item.id)}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-red-50 dark:bg-red-500/15 text-red-500
                   hover:bg-red-100 dark:hover:bg-red-500/25 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  </motion.div>
)

/* ══════════════════════════════════════════
   MAIN ADMIN PANEL
══════════════════════════════════════════ */
const AdminPanel = () => {
  const isAuthed = () => sessionStorage.getItem(SESSION_KEY) === '1'
  const [authed,   setAuthed]   = useState(isAuthed)
  const { items, loading, error, addItem, updateItem, deleteItem } = usePortfolio()
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(null)

  /* ── Not authenticated → show login ── */
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    toast('Logged out.', { icon: '🔒' })
  }

  const filtered = items
    .filter(i => filter === 'all' || i.type === filter)
    .filter(i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    )

  const openAdd  = () => { setEditItem(null); setFormOpen(true) }
  const openEdit = (item) => { setEditItem(item); setFormOpen(true) }
  const close    = () => { setFormOpen(false); setEditItem(null) }

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editItem) { await updateItem(editItem.id, data); toast.success('Item updated!') }
      else          { await addItem(data);                 toast.success('Item added!') }
      close()
    } catch { toast.error('Something went wrong.') }
    finally  { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    setDeleting(id)
    try   { await deleteItem(id); toast.success('Item deleted.') }
    catch { toast.error('Could not delete.') }
    finally { setDeleting(null) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/60
                    dark:from-[#08091a] dark:via-[#0d0f2b] dark:to-[#0a0c1e]">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-white/8
                      bg-white/80 dark:bg-[#0a0c1f]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-500 transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <LayoutDashboard size={16} className="text-white" />
              </div>
              <span className="font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white
                         bg-gradient-to-r from-indigo-500 to-violet-600
                         shadow-[0_4px_14px_rgba(99,102,241,0.4)]
                         hover:shadow-[0_6px_20px_rgba(99,102,241,0.6)] transition-shadow">
              <Plus size={16} /> Add New
            </button>
            <button onClick={handleLogout}
              title="Logout"
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         bg-slate-100 dark:bg-white/8 text-slate-500
                         hover:bg-red-50 hover:text-red-500
                         dark:hover:bg-red-500/15 dark:hover:text-red-400
                         transition-colors duration-200">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Stat label="Total Items"  value={items.length}
            icon={LayoutGrid} color="bg-gradient-to-br from-indigo-500 to-violet-600" />
          <Stat label="Projects"     value={items.filter(i => i.type === 'project').length}
            icon={Code2}      color="bg-gradient-to-br from-blue-500 to-indigo-600" />
          <Stat label="Certificates" value={items.filter(i => i.type === 'certificate').length}
            icon={Award}      color="bg-gradient-to-br from-pink-500 to-rose-600" />
        </div>

        {/* ── Filter + Search ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-white/5
                          border border-slate-200 dark:border-white/10">
            {[
              { key: 'all', label: 'All', Icon: LayoutGrid },
              { key: 'project', label: 'Projects', Icon: Code2 },
              { key: 'certificate', label: 'Certificates', Icon: Award },
            ].map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                            transition-colors duration-200
                  ${filter === key
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 w-full sm:w-auto">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items…"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-white/5
                         border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200
                         placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all" />
          </div>
        </div>

        {/* ── Items list ── */}
        <div className="space-y-3">
          {loading && (
            <div className="py-16 text-center">
              <Loader2 size={28} className="mx-auto animate-spin text-indigo-500 mb-3" />
              <p className="text-sm text-slate-500">Loading portfolio data…</p>
            </div>
          )}
          {error && (
            <div className="py-12 text-center">
              <p className="text-red-500 text-sm">{error}</p>
              <p className="text-xs text-slate-400 mt-1">Make sure the backend server is running.</p>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="py-16 text-center">
              <LayoutGrid size={36} className="mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500">No items found.</p>
              <button onClick={openAdd} className="mt-3 text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                + Add your first item
              </button>
            </div>
          )}
          <AnimatePresence>
            {filtered.map(item =>
              deleting === item.id ? null : (
                <ItemRow key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {formOpen && (
          <ItemForm initial={editItem} onSave={handleSave} onClose={close} saving={saving} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPanel
