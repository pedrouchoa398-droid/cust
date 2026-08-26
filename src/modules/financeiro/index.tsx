import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AccountsList from './AccountsList'
import FinanceHome from './FinanceHome'

export default function FinanceHomeRouter(){
  return (
    <Routes>
      <Route path="/" element={<FinanceHome/>} />
      <Route path="/accounts" element={<AccountsList/>} />
    </Routes>
  )
}
