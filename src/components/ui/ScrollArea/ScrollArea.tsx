import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/utils/style.util.ts"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>((props, ref) => {
  const {
    className,
    children,
    ...restProps
  } = props

  const rawClassList = [
    "relative overflow-hidden",
    className,
  ]

  const mergedClasses = cn(rawClassList)

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={mergedClasses}
      {...restProps}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar />

      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>((props, ref) => {
  const {
    className,
    orientation,
    ...restProps
  } = props

  const rawClassList = [
    "flex touch-none select-none transition-colors",
    className,
  ]

  if (orientation === "vertical") {
    rawClassList.push("h-full w-2.5 border-l border-l-transparent p-[1px]")
  } else if (orientation === "horizontal") {
    rawClassList.push("h-2.5 flex-col border-t border-t-transparent p-[1px]")
  }

  const mergedClasses = cn(rawClassList)

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={mergedClasses}
      {...restProps}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
