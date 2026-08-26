import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './modules/dashboard/Dashboard'
import FinanceHome from './modules/financeiro/FinanceHome'
import ComprasHome from './modules/compras/ComprasHome'
import { AppShell } from './shared/components/AppShell'

export default function App(){
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/financeiro/*" element={<FinanceHome/>} />
        <Route path="/compras/*" element={<ComprasHome/>} />
        <Route path="*" element={<div className="p-4">Not Found — <Link to="/">Go home</Link></div>} />
      </Routes>
    </AppShell>
  )
}
