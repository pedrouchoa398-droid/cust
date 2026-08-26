import { db } from '../db/db'
import fs from 'fs'

// Export all tables as JSON
export async function exportDB(){
  const out: any = { meta: { db: 'cust_db', exportedAt: new Date().toISOString() }, tables: {} }
  for (const t of (db as any).tables){
    out.tables[t.name] = await t.toArray()
  }
  return JSON.stringify(out)
}

// Import JSON (replace=false will merge)
export async function importDB(jsonString: string, options: { replace?: boolean } = {}){
  const obj = JSON.parse(jsonString)
  const replace = options.replace ?? false
  await db.transaction('rw', ...((db as any).tables), async ()=>{
    if (replace){
      for (const t of (db as any).tables){
        await t.clear()
      }
    }
    for (const [name, rows] of Object.entries(obj.tables || {})){
      const table = (db as any)[name]
      if (table && Array.isArray(rows)){
        // use bulkAdd for speed
        await table.bulkAdd(rows)
      }
    }
  })
}
