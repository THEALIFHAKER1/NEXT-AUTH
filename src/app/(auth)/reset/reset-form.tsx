"use client"

import React, { useState, useTransition } from "react"
import Reset from "@/actions/reset"
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import FormInput from "@/components/auth/form-input"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

export default function ResetForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError("")
    setSuccess("")
    startTransition(() => {
      Reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel={"Forgot password?"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              control={form.control}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            <span>Sent reset email</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
