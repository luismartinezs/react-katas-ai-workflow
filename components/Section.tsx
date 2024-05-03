'use client'

import { cn } from '@/lib/utils'
import {
  BookText,
  Code,
  Lightbulb,
  ListTree,
  Search
} from 'lucide-react'
import React from 'react'
import { Separator } from './ui/separator'
import { sectionTitle } from '@/lib/constants'

type SectionProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  separator?: boolean
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false
}) => {
  let icon: React.ReactNode
  switch (title) {
    case sectionTitle.docs:
      icon = <BookText size={18} className="mr-2" />
      break
    case sectionTitle.outline:
      icon = <ListTree size={18} className="mr-2" />
      break
    case sectionTitle.ideas:
      icon = <Lightbulb size={18} className="mr-2" />
      break
    case sectionTitle.kata:
      icon = <Code size={18} className="mr-2" />
      break
    default:
      icon = <Search size={18} className="mr-2" />
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && (
          <h2 className="flex items-center text-lg leading-none py-2">
            {icon}
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  )
}
