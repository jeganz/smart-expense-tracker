import * as React from "react"

import { cn } from "@/lib/utils"

function Input2({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      placeholder="0.0"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground dark:bg-input/30 flex h-50 w-full min-w-0 rounded-md bg-transparent px-3 py-1 !text-9xl transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&-moz-appearance:textfield]",
        className
      )}
      {...props} />
  );
}

export { Input2 }
