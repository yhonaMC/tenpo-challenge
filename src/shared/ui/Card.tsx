import React from 'react'
import { cn } from '../lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn(
        'bg-[#1a1a1a] border border-gray-800 rounded-lg p-4',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:border-gray-700 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
