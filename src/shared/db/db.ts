import Dexie, { Table } from 'dexie'

export interface Account { id?: number; name: string; balance: number; createdAt: Date; updatedAt: Date }
export interface Entry { id?: number; accountId: number; amount: number; date: string; category?: string; note?: string }
export interface Expense { id?: number; accountId: number; amount: number; date: string; recurring?: boolean; category?: string }
export interface Institution { id?: number; name: string }
export interface Debt { id?: number; institutionId: number; principal: number; interestRate: number; createdAt: Date }

class AppDB extends Dexie {
  accounts!: Table<Account, number>
  entries!: Table<Entry, number>
  expenses!: Table<Expense, number>
  institutions!: Table<Institution, number>
  debts!: Table<Debt, number>

  constructor(){
    super('cust_db')
    this.version(1).stores({
      accounts: '++id, name, balance',
      entries: '++id, accountId, date, amount',
      expenses: '++id, accountId, date, amount',
      institutions: '++id, name',
      debts: '++id, institutionId, createdAt'
    })

    this.on('populate', async ()=>{
      // seed demo data
      const now = new Date()
      const a = await this.accounts.add({name:'Caixa', balance:1200, createdAt: now, updatedAt: now})
      await this.entries.add({accountId: a, amount: 1200, date: now.toISOString().slice(0,10), category:'Inicial', note:'Saldo inicial'})
    })
  }
}

export const db = new AppDB()
