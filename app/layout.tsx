import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Footer } from "@/components/footer"
import { AnimatedLogo } from "@/components/animated-logo"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Text Humanizer",
  description: "Transform AI-generated content into natural, human-like writing",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
           <header className="border-b">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
              <AnimatedLogo />
              <ModeToggle />
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
