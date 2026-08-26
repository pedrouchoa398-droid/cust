// Shared entity types used across the app
export type ISODateString = string // e.g. 2026-08-26T12:00:00.000Z

export interface Account {
  id?: number
  name: string
  balanceCents: number
  currency?: string
  createdAt: ISODateString
  updatedAt: ISODateString
}

export interface Entry {
  id?: number
  accountId: number
  amountCents: number
  date: string // YYYY-MM-DD
  categoryId?: number | null
  note?: string
  createdAt?: ISODateString
  updatedAt?: ISODateString
}

export interface Expense {
  id?: number
  accountId: number
  amountCents: number
  date: string // YYYY-MM-DD
  recurring?: boolean
  recurrenceRule?: string | null
  categoryId?: number | null
  createdAt?: ISODateString
  updatedAt?: ISODateString
}

export interface Category {
  id?: number
  name: string
  type?: 'income' | 'expense' | 'neutral'
}

export interface Institution {
  id?: number
  name: string
  createdAt?: ISODateString
  updatedAt?: ISODateString
}

export interface Debt {
  id?: number
  institutionId: number
  principalCents: number
  interestRatePercent: number
  startDate: string // YYYY-MM-DD
  termMonths?: number
  createdAt?: ISODateString
  updatedAt?: ISODateString
}

export interface Parcel {
  id?: number
  debtId: number
  dueDate: string // YYYY-MM-DD
  amountCents: number
  paid?: boolean
  paidAt?: ISODateString | null
}

export interface Goal {
  id?: number
  name: string
  targetCents: number
  currentCents: number
  dueDate?: string
}

export interface Work {
  id?: number
  name: string
  address?: string
  createdAt?: ISODateString
}

export interface Supplier {
  id?: number
  name: string
  createdAt?: ISODateString
}

export interface PurchaseItem {
  id?: number
  purchaseId: number
  description: string
  quantity: number
  unitCents: number
  subtotalCents: number
}

export interface Purchase {
  id?: number
  workId?: number
  supplierId?: number
  totalCents: number
  status: 'draft' | 'ordered' | 'delivered' | 'cancelled'
  createdAt?: ISODateString
  updatedAt?: ISODateString
}

export interface Order {
  id?: number
  purchaseId: number
  orderDate: string
  expectedDeliveryDate?: string
}

export interface Delivery {
  id?: number
  purchaseId: number
  deliveredAt?: ISODateString | null
  status: 'pending' | 'partial' | 'delivered' | 'late'
}

export interface History {
  id?: number
  entityType: string
  entityId: number
  action: string
  diff?: any
  createdAt?: ISODateString
}
