import React from "react"

import { currentUser } from "@/lib/auth"

import UserInfo from "../_components/user-info"

export default async function ServerPage() {
  const user = await currentUser()
  return <UserInfo user={user} label="🖥️ Server Component" />
}
