"use client"

import Link from "next/link"

import { Button } from "../ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

interface FormInputProps {
  label: string
  name?: string
  type?: string
  placeholder?: string
  control: any
  disabled?: boolean
  subLinkHref?: string
  subLinkLabel?: string
}

export default function FormInput({
  label,
  name,
  type,
  placeholder,
  control,
  disabled,
  subLinkHref,
  subLinkLabel,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name || label.toLowerCase()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
            />
          </FormControl>
          {subLinkHref && subLinkLabel && (
            <Button variant={"link"} asChild className="px-0">
              <Link href={subLinkHref}>{subLinkLabel}</Link>
            </Button>
          )}
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  )
}
