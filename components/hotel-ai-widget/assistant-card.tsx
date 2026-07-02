"use client"

import { motion } from "motion/react"
import { MessageCircle, X, type LucideIcon } from "lucide-react"
import { AssistantAvatar } from "./assistant-avatar"
import { QuickActionCard } from "./quick-action-card"
import { cx } from "./utils"
import type { QuickAction } from "./types"

/**
 * Hotel-only scan layout. The Hotel theme greets guests in Czech, German
 * and English at once (language is chosen later inside Typebot), so this
 * layout is intentionally text-light and built to be scanned in seconds.
 */
export interface HotelLayoutData {
  /** Assistant role, one line per language. */
  roleLines: string[]
  /** Presence label, one fragment per language (joined with a dot). */
  onlineLines: string[]
  /** "I can help with" heading, one line per language. */
  helpHeading: string[]
  /** Six actions, each with its icon and a trilingual label stack. */
  actions: Array<{ id: string; icon: LucideIcon; labels: string[] }>
  /** Main CTA, one line per language. */
  ctaLines: string[]
}

interface AssistantCardProps {
  assistantName: string
  assistantTitle: string
  assistantImage?: string
  heroImage?: string
  welcomeTitle: string
  welcomeText: string
  /**
   * When provided (Hotel theme), the card renders the calm, multilingual
   * scan layout instead of the standard single-locale welcome + actions.
   */
  hotelLayout?: HotelLayoutData
  onlineLabel: string
  ctaLabel: string
  closeLabel: string
  quickActions: QuickAction[]
  chatOpen: boolean
  onCta: () => void
  /** When provided, a close button is shown (used in floating mode). */
  onClose?: () => void
  className?: string
}

/**
 * The expanded assistant card: header (avatar, presence, role), the body
 * (a warm welcome + quick actions, or the Hotel scan layout) and the main
 * CTA. Used both as the inline widget and as the expanded surface of the
 * floating launcher.
 */
export function AssistantCard({
  assistantName,
  assistantTitle,
  assistantImage,
  heroImage,
  welcomeTitle,
  welcomeText,
  hotelLayout,
  onlineLabel,
  ctaLabel,
  closeLabel,
  quickActions,
  chatOpen,
  onCta,
  onClose,
  className,
}: AssistantCardProps) {
  const isHotel = !!hotelLayout

  return (
    <div
      className={cx(
        "flex max-h-full flex-col overflow-hidden rounded-3xl border border-[var(--haw-border)] bg-[var(--haw-bg)]",
        "shadow-[0_20px_60px_-30px_rgba(40,60,40,0.45)]",
        className,
      )}
    >
      {/* Header / hero */}
      <header className={cx("relative px-6", isHotel ? "pt-4 pb-3" : "pt-6 pb-5")}>
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--haw-bg) 55%, transparent) 0%, var(--haw-bg) 92%)",
              }}
              aria-hidden="true"
            />
          </>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[var(--haw-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--haw-primary)_10%,transparent)] hover:text-[var(--haw-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)]"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative flex items-center gap-4"
        >
          <AssistantAvatar name={assistantName} image={assistantImage} size={isHotel ? 56 : 64} online />
          <div className="flex min-w-0 flex-col">
            <h2 className="font-serif text-xl font-medium leading-tight text-[var(--haw-text)]">
              {assistantName}
            </h2>

            {isHotel && hotelLayout ? (
              <div className="mt-1 flex flex-col gap-0.5">
                {hotelLayout.roleLines.map((line, i) => (
                  <span
                    key={i}
                    className={cx(
                      "text-xs leading-snug",
                      i === 0 ? "text-[var(--haw-text)]" : "text-[var(--haw-muted)]",
                    )}
                  >
                    {line}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--haw-muted)]">{assistantTitle}</p>
            )}

            <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--haw-online)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--haw-online)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--haw-online)]" />
              </span>
              {isHotel && hotelLayout ? hotelLayout.onlineLines.join(" • ") : onlineLabel}
            </span>
          </div>
        </motion.div>
      </header>

      {/* Body */}
      <div
        className={cx(
          "flex-1 overflow-y-auto rounded-t-3xl bg-[var(--haw-surface)] px-6 shadow-[0_-1px_0_0_var(--haw-border)]",
          isHotel ? "pt-4 pb-4" : "pt-6 pb-7",
        )}
      >
        {isHotel && hotelLayout ? (
          <HotelBody data={hotelLayout} chatOpen={chatOpen} onCta={onCta} />
        ) : (
          <StandardBody
            welcomeTitle={welcomeTitle}
            welcomeText={welcomeText}
            quickActions={quickActions}
            ctaLabel={ctaLabel}
            chatOpen={chatOpen}
            onCta={onCta}
          />
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Hotel scan layout                                                 */
/* ---------------------------------------------------------------- */

function HotelBody({
  data,
  chatOpen,
  onCta,
}: {
  data: HotelLayoutData
  chatOpen: boolean
  onCta: () => void
}) {
  return (
    <>
      {/* "I can help with" — trilingual, framed by hairline rules */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        className="text-center"
      >
        <span className="block h-px w-full bg-[var(--haw-border)]" aria-hidden="true" />
        <div className="flex flex-col gap-0.5 py-2.5">
          {data.helpHeading.map((line, i) => (
            <span
              key={i}
              className={cx(
                "leading-snug",
                i === 0
                  ? "font-serif text-base font-medium text-[var(--haw-text)]"
                  : "text-sm text-[var(--haw-muted)]",
              )}
            >
              {line}
            </span>
          ))}
        </div>
        <span className="block h-px w-full bg-[var(--haw-border)]" aria-hidden="true" />
      </motion.div>

      {/* Large trilingual CTA — placed directly under the heading so it is
          fully visible without scrolling past the info cards below. */}
      <motion.button
        type="button"
        onClick={onCta}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        aria-haspopup="dialog"
        aria-expanded={chatOpen}
        aria-label={data.ctaLines.join(" · ")}
        className={cx(
          "mt-3 flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3",
          "text-[var(--haw-surface)]",
          "shadow-[0_12px_28px_-12px_var(--haw-primary)] transition-all duration-300 hover:shadow-[0_16px_34px_-12px_var(--haw-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--haw-surface)]",
        )}
        style={{ backgroundColor: "var(--haw-primary)" }}
      >
        <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
        <span className="flex flex-col items-center leading-tight">
          <span className="text-base font-semibold">{data.ctaLines[0]}</span>
          {data.ctaLines.slice(1).map((line, i) => (
            <span key={i} className="text-xs opacity-90">
              {line}
            </span>
          ))}
        </span>
      </motion.button>

      {/* Six trilingual info cards (non-interactive) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        className="mt-3 grid grid-cols-2 gap-2"
      >
        {data.actions.map((action) => (
          <HotelActionCard
            key={action.id}
            action={action}
          />
        ))}
      </motion.div>
    </>
  )
}

function HotelActionCard({
  action,
}: {
  action: HotelLayoutData["actions"][number]
}) {
  const { icon: Icon, labels } = action

  return (
    <motion.div
      className={cx(
        "flex h-full flex-col items-center gap-1.5 rounded-2xl border border-[var(--haw-border)] bg-[var(--haw-surface)] px-3 py-2.5 text-center",
        "shadow-[0_2px_10px_-6px_rgba(40,60,40,0.25)]"
      )}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--haw-primary) 12%, var(--haw-surface))",
          color: "var(--haw-primary)",
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-col gap-0.5">
        {labels.map((label, i) => (
          <span
            key={i}
            className={cx(
              "leading-snug [overflow-wrap:anywhere]",
              i === 0
                ? "text-sm font-medium text-[var(--haw-text)]"
                : "text-xs text-[var(--haw-muted)]",
            )}
          >
            {label}
          </span>
        ))}
      </span>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- */
/* Standard layout (print · wine · municipality · education)         */
/* ---------------------------------------------------------------- */

function StandardBody({
  welcomeTitle,
  welcomeText,
  quickActions,
  ctaLabel,
  chatOpen,
  onCta,
}: {
  welcomeTitle: string
  welcomeText: string
  quickActions: QuickAction[]
  ctaLabel: string
  chatOpen: boolean
  onCta: () => void
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      >
        <h3 className="text-pretty font-serif text-lg font-medium text-[var(--haw-text)]">
          {welcomeTitle}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--haw-muted)]">
          {welcomeText}
        </p>
      </motion.div>

      {quickActions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {quickActions.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={onCta}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        aria-haspopup="dialog"
        aria-expanded={chatOpen}
        className={cx(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5",
          "text-base font-medium text-[var(--haw-surface)]",
          "shadow-[0_12px_28px_-12px_var(--haw-primary)] transition-all duration-300 hover:shadow-[0_16px_34px_-12px_var(--haw-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--haw-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--haw-surface)]",
        )}
        style={{ backgroundColor: "var(--haw-primary)" }}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
        {ctaLabel}
      </motion.button>
    </>
  )
}
