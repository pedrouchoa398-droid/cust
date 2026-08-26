import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '../../db/db'
import { createAccount, deleteAccount, listAccounts, getAccount, updateAccount } from '../../repos/accountsRepo'

beforeEach(async ()=>{
  // clear DB tables before each test
  await db.transaction('rw', db.tables, async ()=>{
    for (const t of (db as any).tables) await t.clear()
  })
})

describe('accountsRepo', ()=>{
  it('should create, read, update and delete an account', async ()=>{
    const id = await createAccount({ name: 'Test', balanceCents: 1000, currency: 'BRL' })
    expect(typeof id).toBe('number')

    const list = await listAccounts()
    expect(list.length).toBe(1)
    expect(list[0].name).toBe('Test')

    const acc = await getAccount(id)
    expect(acc).toBeTruthy()
    expect(acc!.balanceCents).toBe(1000)

    await updateAccount(id, { name: 'Updated' })
    const acc2 = await getAccount(id)
    expect(acc2!.name).toBe('Updated')

    await deleteAccount(id)
    const list2 = await listAccounts()
    expect(list2.length).toBe(0)
  })
})
