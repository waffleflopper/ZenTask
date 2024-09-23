import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const pillVariants = cva("text-sm font-semibold px-2 py-1 rounded-full", {
  variants: {
    priority: {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      urgent: "bg-purple-100 text-purple-800",
    },
  },
  defaultVariants: {
    priority: "low",
  },
})

interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

const Pill: React.FC<PillProps> = ({
  priority,
  children,
  className,
  ...props
}) => {
  return (
    <span className={cn(pillVariants({ priority }), className)} {...props}>
      {children}
    </span>
  )
}

export default Pill
