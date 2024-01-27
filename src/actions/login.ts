"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import * as z from "zod"

import { getTwoFactorConfirmationByUserId } from "@/lib/db/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/lib/db/data/two-factor-token"
import { getUserByEmail } from "@/lib/db/data/user"
import { db } from "@/lib/db/db"
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/db/tokens"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"

export async function Login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  // Validate password
  const passwordIsValid = await bcrypt.compare(password, existingUser.password!)
  if (!passwordIsValid) {
    return { error: "Incorrect password!" } // Return error here if password is incorrect
  }

  // Continue with the rest of the logic only if the password is correct

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email!
    )
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: "Confirmation email sent!" }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email!)

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) {
        return { error: "Code expired!" }
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email!)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
      return { twoFactor: true }
    }
  }

  // Final sign-in attempt
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}
