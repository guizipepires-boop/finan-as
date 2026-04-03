import { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import type { FinanceItem } from '../types'
import { addMonths } from '../utils'

const STORAGE_KEY = 'finance_items_v1'

function load(): FinanceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(items: FinanceItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function useFinance() {
  const [items, setItems] = useState<FinanceItem[]>(load)

  const update = useCallback((next: FinanceItem[]) => {
    persist(next)
    setItems(next)
  }, [])

  const addItem = useCallback((
    type: 'income' | 'expense',
    description: string,
    amount: number,
    date: string,
    recurring: boolean,
    recurringMonths: number
  ) => {
    const count = recurring ? recurringMonths : 1
    const newItems: FinanceItem[] = Array.from({ length: count }, (_, i) => ({
      id: uuid(),
      type,
      description,
      amount,
      date: addMonths(date, i),
      completed: false,
      recurring,
      recurringMonths: recurring ? recurringMonths : undefined,
      createdAt: new Date().toISOString(),
    }))
    update([...items, ...newItems])
  }, [items, update])

  const editItem = useCallback((id: string, patch: Partial<FinanceItem>) => {
    update(items.map(i => i.id === id ? { ...i, ...patch } : i))
  }, [items, update])

  const deleteItem = useCallback((id: string) => {
    update(items.filter(i => i.id !== id))
  }, [items, update])

  const toggleItem = useCallback((id: string) => {
    update(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i))
  }, [items, update])

  return { items, addItem, editItem, deleteItem, toggleItem }
}
