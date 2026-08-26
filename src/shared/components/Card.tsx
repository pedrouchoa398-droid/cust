import React from 'react'
export const Card: React.FC<{children:React.ReactNode, className?:string}> = ({children,className=''}) => (
  <div className={`bg-slate-800 rounded-lg p-4 ${className}`}>{children}</div>
)
