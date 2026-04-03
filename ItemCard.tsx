import type { FinanceItem } from '../types'
import { fmtBRL } from '../utils'

interface Props {
  item: FinanceItem
  onToggle: (id: string) => void
  onEdit: (item: FinanceItem) => void
  onDelete: (id: string) => void
}

export function ItemCard({ item, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className={`item-card ${item.type} ${item.completed ? 'completed' : ''}`}>
      <button
        className={`checkbox ${item.completed ? 'checked' : ''}`}
        onClick={() => onToggle(item.id)}
        aria-label={item.completed ? 'Desmarcar' : 'Marcar como concluído'}
      />
      <div className="item-info">
        <span className="item-desc">{item.description}</span>
        {item.recurring && (
          <span className="item-tag">↻ recorrente</span>
        )}
      </div>
      <span className={`item-amount ${item.type}`}>
        {item.type === 'income' ? '+' : '−'} {fmtBRL(item.amount)}
      </span>
      <div className="item-actions">
        <button className="icon-btn" onClick={() => onEdit(item)} aria-label="Editar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="icon-btn danger" onClick={() => onDelete(item.id)} aria-label="Excluir">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
