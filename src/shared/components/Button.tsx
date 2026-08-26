import React from 'react'
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} className={`px-3 py-2 rounded-md bg-sky-400 text-slate-900 font-medium disabled:opacity-50 ${props.className||''}`}>{props.children}</button>
)
