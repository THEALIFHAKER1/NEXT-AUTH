import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

export let isDBConnect = true

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = db
}
