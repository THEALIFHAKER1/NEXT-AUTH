"use server"

import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

import { getUserByEmail } from "@/lib/db/data/user"
import { db } from "@/lib/db/db"
import { generateVerificationToken } from "@/lib/db/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export default async function register(value: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(value)

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password or name",
    }
  }
  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: "Email already exists",
    }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: "Confirmation email sent",
  }
}
