import React from "react"
import { Resend } from "resend"

const resend = new Resend(process.env.RESENT_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: `${emailDomain}`,
    to: email,
    subject: "2FA Code",
    html: `
            <div>
                <p>Your 2FA code:</p>
                <h1>${token}</h1>
            </div>
        `,
  })
}

export async function sentPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/password?token=${token}`

  await resend.emails.send({
    from: `${emailDomain}`,
    to: email,
    subject: "Reset your password",
    html: `
            <div>
                <p>Please reset your password by clicking the link below:</p>
                <a href=${resetLink}>Here</a>
            </div>
        `,
  })
}

export async function sendVerificationEmail(email: string, token: string) {
  const comfirmLink = `${domain}/verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
            <div>
                <p>Please confirm your email address by clicking the link below:</p>
                <a href=${comfirmLink}>Here</a>
            </div>
        `,
  })
}
