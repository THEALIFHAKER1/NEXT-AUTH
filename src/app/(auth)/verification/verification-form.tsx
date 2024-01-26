"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import newVerification from "@/actions/new-verification"
import { BeatLoader } from "react-spinners"

import CardWrapper from "@/components/auth/card-wrapper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token is missing")
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
      .catch((err) => {
        setError("Something went wrong")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel={"Comfirming your verification"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/login"}
    >
      <div className="flex w-full items-center justify-center">
        {!error && !success && (
          <>
            <div className="hidden dark:block">
              <BeatLoader color={"white"} />
            </div>
            <div className="block dark:hidden">
              <BeatLoader color={"black"} />
            </div>
          </>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  )
}
