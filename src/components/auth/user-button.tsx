"use client"

import Link from "next/link"
import { FaUser } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5"

import useCurrentUser from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import LogoutButton from "./logout-button"

export default function UserButton() {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
          <AvatarImage src={user?.image || ""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <IoIosLogOut className="mr-2 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <Link href="/settings">
          <DropdownMenuItem>
            <IoSettingsOutline className="mr-2 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
