import { cn } from "@/lib/utils"
import React from "react"

interface ContainerProps {
  className?: string
  children: React.ReactNode
  as?: React.ElementType
}

export function Container({
  className,
  children,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4 md:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  )
}