import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import Navbar from "./_components/navbar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 ">
        <Navbar />
        {children}
      </div>
      <Toaster />
    </>
  )
}
