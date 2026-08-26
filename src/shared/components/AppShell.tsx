import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AppShell: React.FC<{children:ReactNode}> = ({children}) => {
  const loc = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">CUST — Field Finance & Purchasing</h1>
          <nav className="text-sm text-slate-300">Mobile-first PWA</nav>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full p-4">{children}</main>
      <nav className="bg-slate-900 border-t border-slate-800 p-2 fixed bottom-0 left-0 right-0">
        <div className="max-w-3xl mx-auto flex justify-around">
          <Tab to="/dashboard" label="Dashboard" active={loc.pathname.startsWith('/dashboard')||loc.pathname==='/'}/>
          <Tab to="/financeiro" label="Financeiro" active={loc.pathname.startsWith('/financeiro')}/>
          <Tab to="/compras" label="Compras" active={loc.pathname.startsWith('/compras')}/>
        </div>
      </nav>
    </div>
  )
}

const Tab: React.FC<{to:string,label:string,active:boolean}> = ({to,label,active}) => (
  <a href={to} className={`py-2 px-3 rounded-md ${active? 'bg-slate-700 text-white':'text-slate-400'}`}>{label}</a>
)
