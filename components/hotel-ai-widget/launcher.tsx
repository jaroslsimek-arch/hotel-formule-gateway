"use client"

import { motion } from "motion/react"
import { AssistantAvatar } from "./assistant-avatar"
import { cx } from "./utils"

interface LauncherProps {
  assistantName: string
  assistantImage?: string
  onlineLabel: string
  helperLabel: string
  openLabel: string
  onClick: () => void
}

/**
 * Collapsed floating launcher (State 1). A friendly pill with the
 * assistant's avatar, presence and a short helper line. Clicking it
 * expands the assistant card.
 */
export function Launcher({
  assistantName,
  assistantImage,
  onlineLabel,
  helperLabel,
  openLabel,
  onClick,
}: LauncherProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={openLabel}
      aria-haspopup="dialog"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cx(
        "group flex items-center gap-3 rounded-full border border-[var(--haw-border)] bg-[var(--haw-surface)] py-2 pl-2 pr-5",
        "shadow-[0_16px_40px_-16px_rgba(40,60,40,0.5)] backdrop-blur-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--haw-bg)]",
      )}
    >
      <AssistantAvatar name={assistantName} image={assistantImage} size={48} online />
      <span className="flex flex-col items-start text-left">
        <span className="flex items-center gap-1.5 text-sm font-medium leading-tight text-[var(--haw-text)]">
          {assistantName}
          <span className="text-xs font-normal text-[var(--haw-online)]">· {onlineLabel}</span>
        </span>
        <span className="text-xs leading-tight text-[var(--haw-muted)]">{helperLabel}</span>
      </span>
    </motion.button>
  )
}
