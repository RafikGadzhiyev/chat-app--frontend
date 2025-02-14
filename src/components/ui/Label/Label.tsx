import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/style.util.ts"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>((props,  ref) => {
  const {
    className,
    ...restProps
  } = props

  const classesFromVariants = labelVariants()
  const mergedClasses = cn(
    [
      classesFromVariants,
      className || "",
    ],
  )

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={mergedClasses}
      {...restProps}
    />
  )
})

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
