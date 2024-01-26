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
        toast.success("Granted!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
          description: "API Route Fetch",
        })
      } else {
        toast.error("Deny!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
          description: "API Route Fetch",
        })
      }
    })
  }

  function onServerActionClick() {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error, {
          action: {
            label: "Close",
            onClick: () => {},
          },
          description: "Server Action",
        })
      }

      if (data.success) {
        toast.success(data.success, {
          action: {
            label: "Close",
            onClick: () => {},
          },
          description: "Server Action",
        })
      }
    })
  }

  return (
    <Card className="w-[600px] border-foreground">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-md">
          <p className="font-mdeium text-sm">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-md">
          <p className="font-mdeium text-sm">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Test</Button>
        </div>
      </CardContent>
    </Card>
  )
}
