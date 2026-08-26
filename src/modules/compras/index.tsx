import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ComprasHome from './ComprasHome'

export default function ComprasHomeRouter(){
  return (
    <Routes>
      <Route path="/" element={<ComprasHome/>} />
    </Routes>
  )
}
