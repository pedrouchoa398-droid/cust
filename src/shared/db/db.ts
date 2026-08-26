import Dexie, { Table } from 'dexie'
import { Account, Entry, Expense, Category, Institution, Debt, Parcel, Goal, Work, Supplier, Purchase, PurchaseItem, Order, Delivery, History } from '../../types/entities'

// Database name
const DB_NAME = 'cust_db'

class CustDB extends Dexie {
  accounts!: Table<Account, number>
  entries!: Table<Entry, number>
  expenses!: Table<Expense, number>
  categories!: Table<Category, number>
  institutions!: Table<Institution, number>
  debts!: Table<Debt, number>
  parcels!: Table<Parcel, number>
  goals!: Table<Goal, number>
  works!: Table<Work, number>
  suppliers!: Table<Supplier, number>
  purchases!: Table<Purchase, number>
  purchaseItems!: Table<PurchaseItem, number>
  orders!: Table<Order, number>
  deliveries!: Table<Delivery, number>
  history!: Table<History, number>

  constructor(){
    super(DB_NAME)

    // Version 1: original minimal schema (compatibility)
    this.version(1).stores({
      accounts: '++id, name, balance',
      entries: '++id, accountId, date, amount',
      expenses: '++id, accountId, date, amount'
    })

    // Version 2: canonical schema with cents and all entities
    this.version(2).stores({
      accounts: '++id, name, balanceCents, createdAt, updatedAt',
      entries: '++id, accountId, date, amountCents, categoryId, createdAt',
      expenses: '++id, accountId, date, amountCents, recurring, categoryId, createdAt',
      categories: '++id, name, type',
      institutions: '++id, name, createdAt, updatedAt',
      debts: '++id, institutionId, principalCents, interestRatePercent, startDate, termMonths, createdAt',
      parcels: '++id, debtId, dueDate, amountCents, paid, paidAt',
      goals: '++id, name, targetCents, currentCents, dueDate',
      works: '++id, name, address, createdAt',
      suppliers: '++id, name, createdAt',
      purchases: '++id, workId, supplierId, totalCents, status, createdAt, updatedAt',
      purchaseItems: '++id, purchaseId, description, quantity, unitCents, subtotalCents',
      orders: '++id, purchaseId, orderDate, expectedDeliveryDate',
      deliveries: '++id, purchaseId, deliveredAt, status',
      history: '++id, entityType, entityId, action, createdAt'
    }).upgrade(async (tx) => {
      // Migration logic: convert float balances/amounts -> integer cents
      // Accounts
      try{
        const oldAccounts = await tx.table('accounts').toArray()
        for (const a of oldAccounts){
          const anyA: any = a as any
          if (anyA.balanceCents === undefined){
            const oldBalance = (anyA.balance ?? 0)
            const cents = Math.round(Number(oldBalance || 0) * 100)
            await tx.table('accounts').update(a.id, { balanceCents: cents, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
            // remove old field if present
            if (anyA.hasOwnProperty('balance')){
              delete (anyA as any).balance
            }
          }
        }
      }catch(e){
        // ignore migration errors but log
        console.warn('accounts migration issue', e)
      }

      // Entries
      try{
        const oldEntries = await tx.table('entries').toArray()
        for (const en of oldEntries){
          const anyE: any = en as any
          if (anyE.amountCents === undefined){
            const oldAmount = (anyE.amount ?? 0)
            const cents = Math.round(Number(oldAmount || 0) * 100)
            await tx.table('entries').update(en.id, { amountCents: cents, createdAt: new Date().toISOString() })
            if (anyE.hasOwnProperty('amount')) delete (anyE as any).amount
          }
        }
      }catch(e){
        console.warn('entries migration issue', e)
      }

      // Expenses
      try{
        const oldExpenses = await tx.table('expenses').toArray()
        for (const ex of oldExpenses){
          const anyEx: any = ex as any
          if (anyEx.amountCents === undefined){
            const oldAmount = (anyEx.amount ?? 0)
            const cents = Math.round(Number(oldAmount || 0) * 100)
            await tx.table('expenses').update(ex.id, { amountCents: cents, createdAt: new Date().toISOString() })
            if (anyEx.hasOwnProperty('amount')) delete (anyEx as any).amount
          }
        }
      }catch(e){
        console.warn('expenses migration issue', e)
      }

    })

    // Optional: populate demo data only when DB created fresh
    this.on('populate', async ()=>{
      const now = new Date().toISOString()
      const accId = await this.table('accounts').add({ name: 'Caixa', balanceCents: 120000, currency: 'BRL', createdAt: now, updatedAt: now } as any)
      await this.table('entries').add({ accountId: accId, amountCents: 120000, date: now.slice(0,10), categoryId: null, note: 'Saldo inicial', createdAt: now } as any)
    })
  }
}

export const db = new CustDB()

// Helper exported for tests: convert float amount to cents
export function floatToCents(value: number | string | undefined | null){
  const v = Number(value || 0)
  if (isNaN(v)) return 0
  return Math.round(v * 100)
}
