"use client"

import { useTheme } from "next-themes"
import { Sparkles, Text } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
}

export function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Link href="/" className="flex items-center gap-2 font-bold group">
      <div className="relative transition-transform duration-300 group-hover:scale-110">
        <Text className="h-6 w-6 text-primary transition-all duration-300" />
        <Sparkles
          className={`absolute -top-1 -right-1 h-3 w-3 text-primary transition-all duration-300 ${
            isDark ? "animate-pulse" : ""
          }`}
        />
      </div>
      <span
        className={`${sizeClasses[size]} bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary/90 group-hover:to-primary`}
      >
        TextHumanizer
      </span>
    </Link>
  )
}
