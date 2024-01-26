import { db } from "../db"

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    const twoFactorComfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    })
    return twoFactorComfirmation
  } catch {
    return null
  }
}
