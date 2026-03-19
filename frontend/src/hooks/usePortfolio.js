import { useState, useEffect, useCallback } from 'react'

const API = `${import.meta.env.VITE_API_URL || ''}/api/portfolio`

export const usePortfolio = () => {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      const res  = await fetch(API)
      const data = await res.json()
      setItems(data.items || [])
      setError(null)
    } catch (err) {
      setError('Could not load portfolio data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const addItem = async (item) => {
    const res     = await fetch(API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(item),
    })
    const newItem = await res.json()
    setItems(prev => [newItem, ...prev])
    return newItem
  }

  const updateItem = async (id, updates) => {
    const res     = await fetch(`${API}/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(updates),
    })
    const updated = await res.json()
    setItems(prev => prev.map(i => i.id === id ? updated : i))
    return updated
  }

  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return { items, loading, error, addItem, updateItem, deleteItem, refetch: fetchItems }
}
