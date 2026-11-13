"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  SpinnerIcon,
} from "@phosphor-icons/react"

// Customised: the app is dark-only (no next-themes), and toasts are fully
// styled with Tailwind + theme tokens via `unstyled` instead of inline styles.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      offset={24}
      mobileOffset={16}
      gap={12}
      className="toaster group"
      icons={{
        success: <CheckCircleIcon weight="fill" className="size-5" />,
        info: <InfoIcon weight="fill" className="size-5" />,
        warning: <WarningIcon weight="fill" className="size-5" />,
        error: <XCircleIcon weight="fill" className="size-5" />,
        loading: <SpinnerIcon className="size-5 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group/toast flex w-full items-start gap-3 rounded-xl border bg-popover/95 p-4 text-popover-foreground shadow-[0_24px_60px_-20px_black] backdrop-blur-xl",
          icon: "mt-0.5 shrink-0 text-muted-foreground",
          content: "flex min-w-0 flex-1 flex-col gap-1",
          title: "font-display text-sm leading-tight font-black tracking-tight",
          description: "line-clamp-2 text-sm font-extralight text-muted-foreground",
          actionButton:
            "shrink-0 self-center rounded-md border px-3 py-1.5 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors hover:border-signal hover:text-signal",
          success:
            "border-signal/30 shadow-[0_0_40px_-15px_var(--signal-glow)] [&_[data-icon]]:text-signal",
          error: "border-destructive/40 [&_[data-icon]]:text-destructive",
          info: "[&_[data-icon]]:text-foreground",
          warning: "[&_[data-icon]]:text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
