import { FiAlertTriangle } from "react-icons/fi"

interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className=" flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-red-500 dark:bg-destructive/50">
      <FiAlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
