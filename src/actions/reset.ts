"use server"

import { ResetSchema } from "@/schemas"
import * as z from "zod"

import { getUserByEmail } from "@/lib/db/data/user"
import { generatePasswordResetToken } from "@/lib/db/tokens"
import { sentPasswordResetEmail } from "@/lib/mail"

export default async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      errors: "Invalid email address",
    }
  }
  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      error: "Invalid email address",
    }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sentPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
  return {
    success: "Reset Email sent",
  }
}
