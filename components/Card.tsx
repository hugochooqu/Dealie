import { cn } from '@/lib/utils'
import React, { JSX, ReactNode } from 'react'

interface HomeCardProps {
    title: string,
    desc: string,
    icon: JSX.Element,
    className?: string,
}
const Card = ({icon, title, desc, className}: HomeCardProps) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between gap-2 max-w-[240px] min-h-[240px] rounded-[14px] cursor-pointer ')}>
        <div className={cn('flex items-center justify-center text-white rounded-[16px] size-14 glassmorphism', className)}>
            {icon}
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-[20px] font-bold'>{title}</h1>
            <p className='text-sm font-normal text-silver'>{desc}</p>
        </div>
    </div>
  )
}

export default Card