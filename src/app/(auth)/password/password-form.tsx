"use client"

import React, { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import setPassword from "@/actions/setPassword"
import { SetPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import FormInput from "@/components/auth/form-input"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

export default function PasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof SetPasswordSchema>) {
    setError("")
    setSuccess("")
    if (!token) {
      setError("Token is missing")
      return
    }
    startTransition(() => {
      setPassword(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel={"Enter a new password"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              label="Password"
              type="password"
              placeholder="********"
              control={form.control}
              subLinkLabel="Forgot password?"
              subLinkHref="/reset"
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            <span>Reset password</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
