import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z
  .object({
    image: z.optional(z.string()),
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  )

export const SetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "minimum 6 character required",
    })
    .max(100),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .max(100),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 character required",
    })
    .max(100),
  name: z.string().min(1, {
    message: "Name is required",
  }),
})
