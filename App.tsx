import { useState } from 'react'
import { useFinance } from './hooks/useFinance'
import { Summary } from './components/Summary'
import { Timeline } from './components/Timeline'
import { FormSheet } from './components/FormSheet'
import type { FinanceItem, FilterMode } from './types'

export default function App() {
  const { items, addItem, editItem, deleteItem, toggleItem } = useFinance()
  const [filter, setFilter] = useState<FilterMode>('all')
  const [sheet, setSheet] = useState<{ open: boolean; type: 'income' | 'expense' }>({
    open: false,
    type: 'income',
  })
  const [editingItem, setEditingItem] = useState<FinanceItem | null>(null)

  const now = new Date()
  const monthLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  function openNew(type: 'income' | 'expense') {
    setEditingItem(null)
    setSheet({ open: true, type })
  }

  function openEdit(item: FinanceItem) {
    setEditingItem(item)
    setSheet({ open: true, type: item.type })
  }

  function closeSheet() {
    setSheet(s => ({ ...s, open: false }))
    setEditingItem(null)
  }

  const filters: { label: string; value: FilterMode }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Concluídos', value: 'done' },
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1 className="app-title">Finanças</h1>
          <span className="month-label">{monthLabel}</span>
        </div>
        <div className="filter-row">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <Summary items={items} />

      <Timeline
        items={items}
        filter={filter}
        onToggle={toggleItem}
        onEdit={openEdit}
        onDelete={deleteItem}
      />

      <div className="fabs">
        <button className="fab fab-expense" onClick={() => openNew('expense')} aria-label="Nova saída">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button className="fab fab-income" onClick={() => openNew('income')} aria-label="Nova entrada">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      {sheet.open && (
        <FormSheet
          type={sheet.type}
          editItem={editingItem}
          onSave={addItem}
          onUpdate={editItem}
          onClose={closeSheet}
        />
      )}
    </div>
  )
}
