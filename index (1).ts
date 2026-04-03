export function fmtBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

export function fmtDateFull(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ]
  return `${d} de ${months[m - 1]} de ${y}`
}

export function fmtDateShort(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  return `${d} de ${months[m - 1]}`
}

export function addMonths(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1 + n, d)
  const ny = date.getFullYear()
  const nm = String(date.getMonth() + 1).padStart(2, '0')
  const nd = String(date.getDate()).padStart(2, '0')
  return `${ny}-${nm}-${nd}`
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}
