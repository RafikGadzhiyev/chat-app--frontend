import * as React from "react"

import { cn } from "@/utils/style.util.ts"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  (props, ref) => {
    const {
      className,
      type,
      ...restProps
    } = props

    const rawClassList = [
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className || "",
    ]

    const mergedClasses = cn(rawClassList)

    return (
      <input
        type={type}
        className={mergedClasses}
        ref={ref}
        {...restProps}
      />
    )
  },
)

Input.displayName = "Input"

export { Input }
