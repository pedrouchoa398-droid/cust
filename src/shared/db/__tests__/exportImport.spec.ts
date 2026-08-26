import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '../../db/db'
import { exportDB, importDB } from '../../db/exports'

beforeEach(async ()=>{
  await db.transaction('rw', db.tables, async ()=>{
    for (const t of (db as any).tables) await t.clear()
  })
})

describe('export/import', ()=>{
  it('exports and imports data', async ()=>{
    // seed one account
    const now = new Date().toISOString()
    const id = await db.accounts.add({ name: 'Backup', balanceCents: 5500, createdAt: now, updatedAt: now } as any)
    const json = await exportDB()
    // clear and import
    await db.transaction('rw', db.tables, async ()=>{ for (const t of (db as any).tables) await t.clear() })
    await importDB(json, { replace: true })
    const all = await db.accounts.toArray()
    expect(all.length).toBe(1)
    expect(all[0].name).toBe('Backup')
    expect(all[0].balanceCents).toBe(5500)
  })
})
