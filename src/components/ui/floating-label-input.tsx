import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        placeholder=" "
        className={cn(
          "peer flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2",
          "text-sm text-white",
          "placeholder:opacity-0",
          "focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
FloatingInput.displayName = "FloatingInput"

const FloatingLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        // floated up by default (when input has value)
        "pointer-events-none absolute left-4 top-2 z-10",
        "text-xs font-medium text-violet-400",
        "transition-all duration-150 ease-out",
        // empty state: translate directly to center, no intermediate step
        "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-zinc-500",
        // focused: snap back up
        "peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-violet-400",
        className
      )}
      {...props}
    />
  )
})
FloatingLabel.displayName = "FloatingLabel"

export interface FloatingLabelInputProps extends InputProps {
  label: string
  wrapperClassName?: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ id, label, className, wrapperClassName, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")
    return (
      <div className={cn("relative", wrapperClassName)}>
        <FloatingInput ref={ref} id={inputId} className={className} {...props} />
        <FloatingLabel htmlFor={inputId}>{label}</FloatingLabel>
      </div>
    )
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"

export { FloatingInput, FloatingLabel, FloatingLabelInput }
