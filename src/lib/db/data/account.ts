import { db } from "../db"

export async function getAccountByUserId(userId: string) {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    })
    return account
  } catch (error) {
    return null
  }
}
