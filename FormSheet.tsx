import { useState, useEffect } from 'react'
import type { FinanceItem } from '../types'
import { todayISO } from '../utils'

interface Props {
  type: 'income' | 'expense'
  editItem?: FinanceItem | null
  onSave: (
    type: 'income' | 'expense',
    description: string,
    amount: number,
    date: string,
    recurring: boolean,
    months: number
  ) => void
  onUpdate: (id: string, patch: Partial<FinanceItem>) => void
  onClose: () => void
}

export function FormSheet({ type, editItem, onSave, onUpdate, onClose }: Props) {
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(todayISO())
  const [recurring, setRecurring] = useState(false)
  const [months, setMonths] = useState('3')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editItem) {
      setDesc(editItem.description)
      setAmount(String(editItem.amount))
      setDate(editItem.date)
      setRecurring(false)
      setMonths('3')
    } else {
      setDesc('')
      setAmount('')
      setDate(todayISO())
      setRecurring(false)
      setMonths('3')
    }
    setErrors({})
  }, [editItem, type])

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!desc.trim()) errs.desc = 'Informe uma descrição'
    const val = parseFloat(amount.replace(',', '.'))
    if (!val || val <= 0) errs.amount = 'Informe um valor válido'
    if (!date) errs.date = 'Informe uma data'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSave() {
    if (!validate()) return
    const val = parseFloat(amount.replace(',', '.'))
    if (editItem) {
      onUpdate(editItem.id, { description: desc.trim(), amount: val, date })
    } else {
      onSave(type, desc.trim(), val, date, recurring, parseInt(months) || 1)
    }
    onClose()
  }

  const isIncome = editItem ? editItem.type === 'income' : type === 'income'
  const title = editItem ? 'Editar lançamento' : isIncome ? 'Nova entrada' : 'Nova saída'

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" />
        <h2 className="sheet-title">{title}</h2>

        <div className="field">
          <label>Descrição</label>
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder={isIncome ? 'Ex: Salário, Freelance...' : 'Ex: Aluguel, Conta de luz...'}
            autoFocus
          />
          {errors.desc && <span className="field-error">{errors.desc}</span>}
        </div>

        <div className="field">
          <label>Valor (R$)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0,00"
            min="0.01"
            step="0.01"
            inputMode="decimal"
          />
          {errors.amount && <span className="field-error">{errors.amount}</span>}
        </div>

        <div className="field">
          <label>Data</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          {errors.date && <span className="field-error">{errors.date}</span>}
        </div>

        {!editItem && (
          <>
            <div className="toggle-row">
              <span className="toggle-label">Repetir mensalmente</span>
              <button
                className={`toggle ${recurring ? 'on' : ''}`}
                onClick={() => setRecurring(r => !r)}
                aria-label="Repetir mensalmente"
              />
            </div>

            {recurring && (
              <div className="field" style={{ marginTop: '12px' }}>
                <label>Quantidade de meses</label>
                <input
                  type="number"
                  value={months}
                  onChange={e => setMonths(e.target.value)}
                  min="1"
                  max="60"
                  inputMode="numeric"
                />
              </div>
            )}
          </>
        )}

        <button
          className={`save-btn ${isIncome ? 'save-income' : 'save-expense'}`}
          onClick={handleSave}
        >
          {editItem ? 'Salvar alterações' : isIncome ? 'Salvar entrada' : 'Salvar saída'}
        </button>

        <button className="cancel-btn" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}
