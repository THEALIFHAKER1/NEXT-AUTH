"use client"

import React from "react"
import { admin } from "@/actions/admin"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import FormSuccess from "@/components/form-success"

import RoleGate from "../_components/role-gate"

export default function AdminPage() {
  function onApiRouteClick() {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("SUCCESS")
      } else {
        toast.error("ERROR")
      }
    })
  }

  function onServerActionClick() {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error)
      }

      if (data.success) {
        toast.success(data.success)
      }
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="tetx-sm font-mdeium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="tetx-sm font-mdeium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}
