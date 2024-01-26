import { db } from "../db"

export default async function getVerificationTokenByToken(token: string) {
  try {
    const getVerificationToken = await db.verificationToken.findUnique({
      where: { token },
    })
    return getVerificationToken
  } catch (error) {
    return null
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const getVerificationToken = await db.verificationToken.findFirst({
      where: { email },
    })
    return getVerificationToken
  } catch (error) {
    return null
  }
}
