import React, { useEffect, useState } from 'react'
import { Card } from '../../shared/components/Card'
import { db } from '../../shared/db/db'

export default function Dashboard(){
  const [summary, setSummary] = useState({balance:0, entries:0, expenses:0, debts:0, purchases:0, lateDeliveries:0})
  useEffect(()=>{
    let mounted = true
    async function load(){
      const accounts = await db.accounts.toArray()
      const balance = accounts.reduce((s,a)=>s+a.balance,0)
      const entries = await db.entries.count()
      const expenses = await db.expenses.count()
      const debts = await db.debts.count()
      const purchases = 0
      const lateDeliveries = 0
      if(mounted) setSummary({balance,entries,expenses,debts,purchases,lateDeliveries})
    }
    load()
    return ()=>{mounted=false}
  },[])
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="text-sm text-slate-400">Saldo disponível</div>
          <div className="text-2xl font-bold">R$ {summary.balance.toFixed(2)}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-400">Entradas</div>
          <div className="text-2xl font-bold">{summary.entries}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-400">Despesas</div>
          <div className="text-2xl font-bold">{summary.expenses}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-400">Dívidas</div>
          <div className="text-2xl font-bold">{summary.debts}</div>
        </Card>
      </div>
      <Card>
        <h3 className="font-semibold">Ações rápidas</h3>
        <div className="mt-2 flex gap-2">
          <a href="/financeiro/accounts" className="px-3 py-2 bg-sky-400 text-slate-900 rounded">Contas</a>
          <a href="/financeiro" className="px-3 py-2 bg-slate-700 text-slate-200 rounded">Financeiro</a>
        </div>
      </Card>
    </div>
  )
}
