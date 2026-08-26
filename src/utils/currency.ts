export function centsToCurrency(cents: number, currency = 'BRL'){
  const sign = cents < 0 ? '-' : ''
  const abs = Math.abs(cents)
  const units = Math.floor(abs / 100)
  const rem = (abs % 100).toString().padStart(2,'0')
  return `${sign}${units},${rem}`
}

export function currencyToCents(value: string){
  // Accepts formats like "1234.56" or "1.234,56" or "1234,56"
  if(!value) return 0
  // Normalize comma decimal separator to dot
  const normalized = value.replace(/\./g,'').replace(/,/g,'.')
  const n = Number(normalized)
  if (isNaN(n)) return 0
  return Math.round(n * 100)
}
