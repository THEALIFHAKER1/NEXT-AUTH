"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import RegisterForm from "@/app/(auth)/register/register-form"

interface RegisterButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export default function RegisterButton({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) {
  const Router = useRouter()

  function handleRegister() {
    Router.push("/register")
  }

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto bg-transparent p-0">
          <RegisterForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span onClick={handleRegister} className="cursor-pointer">
      {children}
    </span>
  )
}
