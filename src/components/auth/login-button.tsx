"use client"

import { useRouter } from "next/navigation"

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
    return <span>TODO: Implement modal</span>
  }
  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  )
}