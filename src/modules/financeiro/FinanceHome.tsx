import React, { useEffect } from 'react'
import { Card } from '../../shared/components/Card'
import { useAccountsStore } from './store/accountsStore'
import { Link } from 'react-router-dom'

export default function FinanceHome(){
  const {accounts, load, remove} = useAccountsStore()
  useEffect(()=>{ load() }, [])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financeiro</h2>
        <Link to="/financeiro/accounts" className="text-sky-400">Manage</Link>
      </div>
      <Card>
        <h3 className="text-sm text-slate-300">Contas</h3>
        <div className="mt-3 space-y-2">
          {accounts.length===0 && <div className="text-slate-400">Nenhuma conta. Crie uma.</div>}
          {accounts.map(a=> (
            <div key={a.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-sm text-slate-400">Saldo: R$ {a.balance.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>remove(a.id!)} className="text-red-400">Excluir</button>
                <Link to={`/financeiro/accounts/${a.id}`} className="text-sky-400">Abrir</Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
