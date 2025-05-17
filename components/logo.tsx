import { Sparkles, Text } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <div className="relative">
        <Text className="h-6 w-6 text-primary" />
        <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
      </div>
      <span
        className={`${sizeClasses[size]} bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent`}
      >
        TextHumanizer
      </span>
    </Link>
  )
}
