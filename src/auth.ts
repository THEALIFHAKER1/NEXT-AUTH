import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, type Session } from "next-auth"

import { db } from "@/lib/db/db"

import authConfig from "./auth.config"
import { getAccountByUserId } from "./lib/db/data/account"
import { getTwoFactorConfirmationByUserId } from "./lib/db/data/two-factor-confirmation"
import { getUserById } from "./lib/db/data/user"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}
declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      //temp
      if (!user.id) {
        return false
      }

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorComfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorComfirmation) return false

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorComfirmation.id },
        })
      }

      return true
    },
    async session({ token, session }: { token?: any; session: Session }) {
      // temp
      if (token.sub && session.user) session.user.id = token.sub
      if (token.role && session.user) session.user.role = token.role
      if (session.user)
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      if (session.user) {
        session.user.image = token.image
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      const existingAccount = await getAccountByUserId(existingUser.id)
      token.isOAuth = !!existingAccount
      token.image = existingUser.image
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
