"use client"

import React, { useState, useTransition } from "react"
import register from "@/actions/register"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper"
import FormInput from "@/components/auth/form-input"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values).then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel={"Create an account"}
      backButtonLabel={"Already have an account?"}
      backButtonHref={"/login"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              label="Name"
              placeholder="john.doe"
              control={form.control}
            />
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
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            <span>Register</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
