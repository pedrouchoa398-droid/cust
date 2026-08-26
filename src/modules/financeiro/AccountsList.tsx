import React, { useEffect, useState } from 'react'
import { useAccountsStore } from './store/accountsStore'
import { Card } from '../../shared/components/Card'
import { Button } from '../../shared/components/Button'
import { Link } from 'react-router-dom'

export default function AccountsList(){
  const {accounts, load, create, remove} = useAccountsStore()
  const [name,setName] = useState('')
  const [balance,setBalance] = useState('0')
  useEffect(()=>{ load() }, [])
  async function add(){
    if(!name) return
    await create({name, balance: parseFloat(balance) || 0})
    setName(''); setBalance('0')
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Contas</h2>
        <Link to="/financeiro">Voltar</Link>
      </div>
      <Card>
        <div className="flex gap-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome da conta" className="flex-1 p-2 rounded bg-slate-700" />
          <input value={balance} onChange={e=>setBalance(e.target.value)} className="w-28 p-2 rounded bg-slate-700" />
          <Button onClick={add}>Criar</Button>
        </div>
        <div className="mt-4 space-y-3">
          {accounts.map(a=> (
            <div key={a.id} className="flex justify-between items-center bg-slate-800 p-3 rounded">
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-slate-400 text-sm">Saldo: R$ {a.balance.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>remove(a.id!)} className="text-red-400">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
