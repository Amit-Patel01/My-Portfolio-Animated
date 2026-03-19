import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname  = dirname(fileURLToPath(import.meta.url))
const DATA_FILE  = join(__dirname, 'portfolio.json')
const app        = express()
const PORT       = process.env.PORT || 3001
const resend     = new Resend("re_Uy8TF7AN_65VkxqJq2X31BP4ah6Xs5yxi")
console.log('Resend initialized:', !!resend.versions)

app.use(cors())
app.use(express.json({ strict: false, limit: '10mb' }))

/* ── Helpers ── */
const readData  = () => JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
const writeData = (d) => writeFileSync(DATA_FILE, JSON.stringify(d, null, 2))

/* ─────────────────────────────────────────────
   PORTFOLIO CRUD API
───────────────────────────────────────────── */

app.get('/api/portfolio', (_req, res) => {
  try { res.json(readData()) }
  catch { res.status(500).json({ error: 'Failed to read data.' }) }
})

app.post('/api/portfolio', (req, res) => {
  try {
    const data = readData()
    const item = {
      ...req.body,
      id:    `item_${Date.now()}`,
      color: req.body.type === 'project'
        ? 'from-indigo-500 to-violet-600'
        : 'from-pink-500 to-rose-600',
    }
    data.items.unshift(item)
    writeData(data)
    res.status(201).json(item)
  } catch { res.status(500).json({ error: 'Failed to add item.' }) }
})

app.put('/api/portfolio/:id', (req, res) => {
  try {
    const data  = readData()
    const index = data.items.findIndex(i => i.id === req.params.id)
    if (index === -1) return res.status(404).json({ error: 'Not found.' })
    data.items[index] = { ...data.items[index], ...req.body }
    writeData(data)
    res.json(data.items[index])
  } catch { res.status(500).json({ error: 'Failed to update.' }) }
})

app.delete('/api/portfolio/:id', (req, res) => {
  try {
    const data = readData()
    const prev = data.items.length
    data.items = data.items.filter(i => i.id !== req.params.id)
    if (data.items.length === prev) return res.status(404).json({ error: 'Not found.' })
    writeData(data)
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Failed to delete.' }) }
})

/* ─────────────────────────────────────────────
   CONTACT EMAIL
───────────────────────────────────────────── */

app.post('/contact', async (req, res) => {
  console.log('POST /contact body:', req.body)
  console.log('Body type:', typeof req.body, 'Keys:', Object.keys(req.body || {}))
  const { name, email, message } = req.body
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' })

  try {
    const { data, error } = await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      'amitpatel07029@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8faff;border-radius:12px;">
          <h2 style="color:#6366f1;margin-top:0;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#374151;width:80px;">Name:</td>
              <td style="padding:8px 0;color:#111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#374151;">Email:</td>
              <td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top:16px;">
            <p style="font-weight:600;color:#374151;margin-bottom:8px;">Message:</p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;color:#111827;white-space:pre-line;">${message}</div>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent via AmitSolutionHub Portfolio</p>
        </div>
      `,
    })
    if (error) { console.error('Resend error:', error); return res.status(500).json({ error: 'Email failed.' }) }
    console.log('Email sent:', data?.id)
    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
