"use server"

import { getUserByEmail } from "@/lib/db/data/user"
import getVerificationTokenByToken from "@/lib/db/data/verification-token"
import { db } from "@/lib/db/db"

export default async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return {
      error: "Invalid token",
    }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return {
      error: "Token expired",
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return {
      error: "User not found",
    }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return {
    success: "Email verified",
  }
}
