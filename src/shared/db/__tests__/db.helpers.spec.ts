import { describe, it, expect, beforeEach } from 'vitest'
import { db, floatToCents } from '../../shared/db/db'

describe('db helpers', ()=>{
  it('floatToCents converts correctly', ()=>{
    expect(floatToCents(12.34)).toBe(1234)
    expect(floatToCents('5.2')).toBe(520)
    expect(floatToCents(undefined)).toBe(0)
  })
})
