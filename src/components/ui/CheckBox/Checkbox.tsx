import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/utils/style.util.ts"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>((props,  ref) => {
  const {
    className,
    ...restProps
  } = props

  const mergedRootClasses = cn(
    [
      "peer h-4 w-4 shrink-0 rounded-sm border border-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className || "",
    ],
  )

  const mergedIndicatorClasses = cn(
    [
      "flex items-center justify-center text-current",
    ],
  )

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={mergedRootClasses}
      {...restProps}
    >
      <CheckboxPrimitive.Indicator
        className={mergedIndicatorClasses}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
