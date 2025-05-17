import { Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 mt-8">
      <div className="container  flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left ml-5">
          © {new Date().getFullYear()} Seid Yesuf. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mr-5">
          <Mail className="h-4 w-4" />
          <Link href="mailto:seidyesuf750@gmail.com" className="hover:text-foreground transition-colors">
            seidyesuf750@gmail.com
          </Link>
        </div>
      </div>
    </footer>
  )
}
