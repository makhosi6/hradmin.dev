import { Spinner } from '@/app/theme'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-16 w-16 text-gray-900/50" />;
    </div>
  )
}
