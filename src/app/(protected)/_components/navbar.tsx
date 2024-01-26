"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import UserButton from "@/components/auth/user-button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex gap-2">
      <div className="flex w-[600px] items-center justify-between rounded-xl border border-foreground p-4 shadow-sm">
        <div className="flex gap-x-2">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "outline" : "default"}
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/server" ? "outline" : "default"}
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "outline" : "default"}
          >
            <Link href="/client">Client</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "outline" : "default"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-foreground p-4 shadow-sm">
        <UserButton />
      </div>
    </div>
  )
}
