import React from 'react'
import { Card } from '@/shared/ui'

export const UserCardSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse">
      <div className="flex gap-4">
        {/* Avatar skeleton */}
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-800"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Name skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>

          {/* Tags skeleton */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-800 rounded w-16"></div>
            <div className="h-6 bg-gray-800 rounded w-16"></div>
            <div className="h-6 bg-gray-800 rounded w-12"></div>
          </div>
        </div>
      </div>
    </Card>
  )
}

