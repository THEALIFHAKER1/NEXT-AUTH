"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import LoginForm from "@/app/(auth)/login/login-form"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const Router = useRouter()

  function handleLogin() {
    Router.push("/login")
  }

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  )
}
