"use client"

import React, { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Login } from "@/actions/login"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import FormInput from "@/components/auth/form-input"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : ""
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("")
    setSuccess("")
    startTransition(() => {
      Login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError("Something went wrong, please try again."))
    })
  }
  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/register"}
      showSocial
      {...(showTwoFactor && {
        headerLabel: "Two-factor authentication",
        backButtonHref: "/",
        onClick: () => window.location.reload(),
        backButtonLabel: "Back to home",
        showSocial: false,
      })}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormInput
                label="SECURITY CODE"
                name="code"
                placeholder="2FA code"
                control={form.control}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="john.doe@example.com"
                  control={form.control}
                />
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="********"
                  control={form.control}
                  subLinkLabel="Forgot password?"
                  subLinkHref="/reset"
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            <span>{showTwoFactor ? "Comfirm" : "Sign in"}</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
