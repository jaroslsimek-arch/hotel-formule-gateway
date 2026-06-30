"use client"

import { motion } from "motion/react"
import { cx } from "./utils"
import type { QuickAction } from "./types"

interface QuickActionCardProps {
  action: QuickAction
}

/**
 * A single tactile quick-action card. Renders as a link when `href`
 * is provided, otherwise as a button. Text is never truncated and the
 * whole card is a large, comfortable touch target.
 */
export function QuickActionCard({ action }: QuickActionCardProps) {
  const { label, description, icon: Icon, href, onClick } = action

  const inner = (
    <>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.05]"
        style={{
          backgroundColor: "color-mix(in srgb, var(--haw-primary) 12%, var(--haw-surface))",
          color: "var(--haw-primary)",
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col text-left">
        <span className="text-sm font-medium leading-snug text-[var(--haw-text)] [overflow-wrap:anywhere]">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 text-xs leading-snug text-[var(--haw-muted)] [overflow-wrap:anywhere]">
            {description}
          </span>
        )}
      </span>
    </>
  )

  const sharedClass = cx(
    "group flex w-full items-start gap-3 rounded-2xl border border-[var(--haw-border)] bg-[var(--haw-surface)] px-3.5 py-3.5 min-h-[64px]",
    "shadow-[0_2px_10px_-6px_rgba(40,60,40,0.25)] transition-all duration-300",
    "hover:border-[color-mix(in_srgb,var(--haw-primary)_35%,var(--haw-border))] hover:shadow-[0_10px_24px_-12px_rgba(40,60,40,0.45)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--haw-bg)]",
  )

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={sharedClass}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={sharedClass}
    >
      {inner}
    </motion.button>
  )
}
