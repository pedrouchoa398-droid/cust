import { db } from '../db/db'
import { Expense } from '../../../types/entities'

export async function createExpense(e: Omit<Expense,'id'|'createdAt'|'updatedAt'>){
  const now = new Date().toISOString()
  const id = await db.expenses.add({ ...e, createdAt: now, updatedAt: now } as any)
  return id
}

export async function updateExpense(id:number, patch: Partial<Expense>){
  const now = new Date().toISOString()
  await db.expenses.update(id, { ...patch, updatedAt: now } as any)
}

export async function deleteExpense(id:number){
  await db.expenses.delete(id)
}

export async function listExpensesByAccount(accountId:number){
  return await db.expenses.where('accountId').equals(accountId).sortBy('date')
}
