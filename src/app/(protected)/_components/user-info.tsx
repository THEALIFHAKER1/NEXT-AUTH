import { ExtendedUser } from "@/auth"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface UserInfoProps {
  user?: ExtendedUser
  label: string
}

export default function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="w-[600px] border-foreground shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-md  p-1 font-mono text-xs">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] truncate rounded-md  p-1 font-mono text-xs">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] truncate rounded-md  p-1 font-mono text-xs">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] truncate rounded-md  p-1 font-mono text-xs">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border border-foreground p-3 shadow-sm">
          <p className="text-sm font-medium">2FA Security</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "failure"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
