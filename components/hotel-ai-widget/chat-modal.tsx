"use client"

import { useCallback, useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import { AssistantAvatar } from "./assistant-avatar"
import { cx } from "./utils"

interface ChatModalProps {
  open: boolean
  onClose: () => void
  assistantName: string
  assistantTitle: string
  assistantImage?: string
  /** Localized "Online now" label. */
  onlineLabel: string
  /** Localized accessible label for the close button. */
  closeLabel: string
  /** Localized placeholder text shown inside the chat container. */
  placeholderText: string
  /** Theme CSS variables (forwarded since the modal is portalled to body). */
  themeVars?: CSSProperties
  children?: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function ChatModal({
  open,
  onClose,
  assistantName,
  assistantTitle,
  assistantImage,
  onlineLabel,
  closeLabel,
  placeholderText,
  themeVars,
  children,
}: ChatModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descId = useId()

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Remember & restore focus, move focus into the dialog.
  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const id = window.setTimeout(() => {
      const node = panelRef.current
      if (!node) return
      const first = node.querySelector<HTMLElement>(FOCUSABLE)
      ;(first ?? node).focus()
    }, 20)
    return () => {
      window.clearTimeout(id)
      previouslyFocused.current?.focus?.()
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== "Tab") return

      const node = panelRef.current
      if (!node) return
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (focusable.length === 0) {
        e.preventDefault()
        node.focus()
        return
      }
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 font-sans sm:items-center sm:p-4"
          style={themeVars}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[rgba(28,38,28,0.45)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={cx(
              "relative flex max-h-[92vh] w-full flex-col overflow-hidden bg-[var(--haw-surface)]",
              "rounded-t-3xl shadow-[0_-12px_40px_-12px_rgba(28,38,28,0.4)]",
              "sm:max-w-lg sm:rounded-3xl sm:shadow-[0_30px_70px_-25px_rgba(28,38,28,0.55)]",
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--haw-border)] bg-[color-mix(in_srgb,var(--haw-primary)_6%,var(--haw-surface))] px-5 py-4">
              <AssistantAvatar name={assistantName} image={assistantImage} size={44} online />
              <div className="flex min-w-0 flex-col">
                <span id={titleId} className="truncate font-serif text-base font-medium text-[var(--haw-text)]">
                  {assistantName}
                </span>
                <span id={descId} className="truncate text-xs text-[var(--haw-muted)]">
                  {`${assistantTitle} · ${onlineLabel}`}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-[var(--haw-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--haw-primary)_10%,transparent)] hover:text-[var(--haw-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)]"
              >
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Body: chat placeholder + optional custom content. The
                #hotel-ai-chat-container is the mount target that the widget
                polls for to initialize Typebot. */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div
                id="hotel-ai-chat-container"
                className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-dashed border-[var(--haw-border)] bg-[color-mix(in_srgb,var(--haw-primary)_4%,var(--haw-surface))] text-center text-sm text-[var(--haw-muted)]"
              >
                <p className="max-w-xs text-balance px-6 leading-relaxed">{placeholderText}</p>
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
