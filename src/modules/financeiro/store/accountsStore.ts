import create from 'zustand'
import { db, Account } from '../../shared/db/db'

type State = {
  accounts: Account[]
  load: ()=>Promise<void>
  create: (a: Omit<Account,'id'|'createdAt'|'updatedAt'>)=>Promise<void>
  remove: (id:number)=>Promise<void>
}

export const useAccountsStore = create<State>((set,get)=>({
  accounts: [],
  load: async ()=>{
    const all = await db.accounts.toArray()
    set({accounts: all})
  },
  create: async (a)=>{
    const now = new Date()
    const id = await db.accounts.add({...a, createdAt: now, updatedAt: now})
    await get().load()
    return id
  },
  remove: async (id)=>{
    await db.accounts.delete(id)
    await get().load()
  }
}))
