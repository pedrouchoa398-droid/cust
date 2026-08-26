import { db } from '../db/db'
import { Entry } from '../../../types/entities'

export async function createEntry(e: Omit<Entry,'id'|'createdAt'|'updatedAt'>){
  const now = new Date().toISOString()
  const id = await db.entries.add({ ...e, createdAt: now, updatedAt: now } as any)
  return id
}

export async function updateEntry(id:number, patch: Partial<Entry>){
  const now = new Date().toISOString()
  await db.entries.update(id, { ...patch, updatedAt: now } as any)
}

export async function deleteEntry(id:number){
  await db.entries.delete(id)
}

export async function listEntriesByAccount(accountId:number){
  return await db.entries.where('accountId').equals(accountId).sortBy('date')
}
