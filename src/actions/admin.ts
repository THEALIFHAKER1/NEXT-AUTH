"use server"

import { UserRole } from "@prisma/client"

import { currentRole } from "@/lib/auth"

export async function admin() {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return {
      success: "Granted!",
    }
  }

  return {
    error: "Deny!",
  }
}
