import React from 'react'
import { Card } from '@/shared/ui'
import type { User } from '../types'

interface UserCardProps {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const fullName = `${user.name.first} ${user.name.last}`
  const registeredDate = new Date(user.registered.date).toLocaleDateString(
    'es-ES',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  )

  return (
    <Card className="hover:border-[#9EF4C6] transition-all hover:shadow-lg hover:shadow-[#9EF4C6]/10">
      <div className="flex gap-4">
        <div className="shrink-0">
          <img
            src={user.picture.large}
            alt={fullName}
            className="w-20 h-20 rounded-full ring-2 ring-gray-800 hover:ring-[#9EF4C6] transition-all"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{fullName}</h3>
            <p className="text-sm text-gray-400">@{user.login.username}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg
                className="w-4 h-4 text-[#9EF4C6]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg
                className="w-4 h-4 text-[#9EF4C6]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{user.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {user.location.city}, {user.location.country}
            </span>

            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {user.dob.age} años
            </span>

            <span className="px-2 py-0.5 bg-[#9EF4C6]/10 text-[#9EF4C6] rounded text-xs font-medium">
              {user.nat}
            </span>
          </div>

          <p className="text-xs text-gray-500">Registrado: {registeredDate}</p>
        </div>
      </div>
    </Card>
  )
}
