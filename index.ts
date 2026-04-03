export interface FinanceItem {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: number
  date: string // YYYY-MM-DD
  completed: boolean
  recurring: boolean
  recurringMonths?: number
  createdAt: string
}

export type FilterMode = 'all' | 'pending' | 'done'
