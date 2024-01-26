"use client"

import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

export default function Sosial() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  function clickHandler(provider: "google" | "github") {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button className="w-full" onClick={() => clickHandler("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" onClick={() => clickHandler("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
