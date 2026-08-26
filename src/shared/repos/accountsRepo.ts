import { db } from '../db/db'
import { Account } from '../../../types/entities'

export async function createAccount(input: Omit<Account,'id'|'createdAt'|'updatedAt'>){
  const now = new Date().toISOString()
  const id = await db.transaction('rw', db.accounts, async ()=>{
    return await db.accounts.add({ ...input, createdAt: now, updatedAt: now })
  })
  return id
}

export async function updateAccount(id: number, patch: Partial<Account>){
  const now = new Date().toISOString()
  await db.accounts.update(id, { ...patch, updatedAt: now } as any)
}

export async function deleteAccount(id: number){
  await db.accounts.delete(id)
}

export async function getAccount(id: number){
  return await db.accounts.get(id)
}

export async function listAccounts(){
  return await db.accounts.toArray()
}
