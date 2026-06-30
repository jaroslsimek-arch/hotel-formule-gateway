"use client"

import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { AnimatePresence, motion } from "motion/react"
import { AssistantCard } from "./assistant-card"
import { Launcher } from "./launcher"
import { ChatModal } from "./chat-modal"
import { cx } from "./utils"
import { getTheme } from "./themes"
import { interpolate, resolveStrings, type Locale } from "./i18n"
import type { HotelAIWidgetProps, QuickAction } from "./types"

/**
 * HotelAIWidget — the foundation of the Redorwhite AI Widget library.
 *
 * A warm, human, prop-driven assistant widget. Switch `theme`
 * (hotel · print · wine · municipality · education) and `locale`
 * (cs · de · en, with graceful fallback) to repurpose it for any
 * business. Fully self-contained: drop the folder into any Next.js
 * (App Router) project and render `<HotelAIWidget />`.
 */
export function HotelAIWidget({
  theme = "hotel",
  locale = "en",
  mode = "floating",
  position = "bottom-right",
  defaultOpen = false,
  hotelName = "our business",
  assistantName = "Marta",
  assistantTitle,
  assistantImage,
  heroImage,
  welcomeTitle,
  welcomeText,
  buttonLabel,
  primaryColor,
  accentColor,
  quickActions,
  children,
  onOpenChat,
  onCloseChat,
  className,
}: HotelAIWidgetProps) {
  const themeDef = getTheme(theme)
  const t = useMemo(() => resolveStrings(locale), [locale])

  const [expanded, setExpanded] = useState(mode === "inline" || defaultOpen)
  const [chatOpen, setChatOpen] = useState(false)

  // Resolve copy: explicit props win, then theme/locale defaults.
  const role = assistantTitle ?? t.roles[themeDef.role]
  const welcome = t.themes[themeDef.name] ?? t.themes.hotel!
  const resolvedWelcomeTitle = welcomeTitle ?? welcome.welcomeTitle
  const resolvedWelcomeText = welcomeText ?? welcome.welcomeText

  // The Hotel theme is a calm, scan-in-three-seconds layout that greets guests
  // in Czech, German and English at once (the actual language is chosen later
  // inside Typebot). Action labels are reused from the existing i18n tables;
  // the hotel-specific brand microcopy (role, presence, heading, CTA) is fixed
  // trilingual copy. All other themes keep the standard single-locale layout.
  // Explicit `welcomeTitle`/`welcomeText`/`quickActions` props opt out.
  const hotelLayout = useMemo(() => {
    if (themeDef.name !== "hotel" || welcomeTitle || welcomeText || quickActions) return undefined
    const order: Locale[] = ["cs", "de", "en"]
    const tables = order.map((loc) => resolveStrings(loc))
    // The Hotel "Contact Reception" action reads better as just "Reception".
    const enReceptionLabel = "Reception"
    const actions = themeDef.actions.map(({ id, icon }) => ({
      id,
      icon,
      labels: tables.map((tbl, i) =>
        id === "reception" && order[i] === "en" ? enReceptionLabel : (tbl.actions[id]?.label ?? id),
      ),
    }))
    return {
      roleLines: ["AI recepční", "KI-Rezeption", "AI Receptionist"],
      onlineLines: ["Právě online", "Online", "Online"],
      helpHeading: ["Mohu pomoci s", "Ich helfe bei", "I can help with"],
      actions,
      ctaLines: ["Chat s AI Martou", "Chat mit AI Marta", "Chat with AI Marta"],
    }
  }, [themeDef, welcomeTitle, welcomeText, quickActions])
  const cta = buttonLabel ?? interpolate(t.common.cta, { name: assistantName })
  const openLabel = interpolate(t.common.openConversation, { name: assistantName })
  const placeholderText = interpolate(t.common.chatPlaceholder, { name: assistantName })
  const regionLabel = interpolate(t.common.regionLabel, { name: assistantName })

  // Resolve quick actions: explicit prop wins, else build from theme + i18n.
  const resolvedActions: QuickAction[] = useMemo(() => {
    if (quickActions) return quickActions
    return themeDef.actions.map(({ id, icon }) => {
      const strings = t.actions[id]
      return {
        id,
        icon,
        label: strings?.label ?? id,
        description: strings?.description,
      }
    })
  }, [quickActions, themeDef, t])

  // Theme is exposed through CSS variables. The portalled modal is outside
  // this subtree, so the same vars are forwarded to it explicitly.
  const themeVars = useMemo(() => {
    const p = themeDef.palette
    return {
      "--haw-primary": primaryColor ?? p.primary,
      "--haw-accent": accentColor ?? p.accent,
      "--haw-bg": p.bg,
      "--haw-surface": p.surface,
      "--haw-text": p.text,
      "--haw-muted": p.muted,
      "--haw-border": p.border,
      "--haw-online": p.online,
    } as CSSProperties
  }, [themeDef, primaryColor, accentColor])

  const openChat = useCallback(() => {
    setChatOpen(true)
    onOpenChat?.()
  }, [onOpenChat])

  const closeChat = useCallback(() => {
    setChatOpen(false)
    onCloseChat?.()
  }, [onCloseChat])

  const isFloating = mode === "floating"
  const sideClass = position === "bottom-left" ? "left-4 sm:left-6" : "right-4 sm:right-6"

  const card = (
    <AssistantCard
      assistantName={assistantName}
      assistantTitle={role}
      assistantImage={assistantImage}
      heroImage={heroImage}
      welcomeTitle={resolvedWelcomeTitle}
      welcomeText={resolvedWelcomeText}
      hotelLayout={hotelLayout}
      onlineLabel={t.common.online}
      ctaLabel={cta}
      closeLabel={t.common.close}
      quickActions={resolvedActions}
      chatOpen={chatOpen}
      onCta={openChat}
      onClose={isFloating ? () => setExpanded(false) : undefined}
    />
  )

  const modal = (
    <ChatModal
      open={chatOpen}
      onClose={closeChat}
      assistantName={assistantName}
      assistantTitle={role}
      assistantImage={assistantImage}
      onlineLabel={t.common.online}
      closeLabel={t.common.close}
      placeholderText={placeholderText}
      themeVars={themeVars}
    >
      {children}
    </ChatModal>
  )

  // ---- Inline mode: render the card in normal document flow. --------------
  if (!isFloating) {
    return (
      <section
        aria-label={regionLabel}
        style={themeVars}
        className={cx("font-sans text-[var(--haw-text)]", "mx-auto w-full max-w-md", className)}
      >
        {card}
        {modal}
      </section>
    )
  }

  // ---- Floating mode: launcher (State 1) <-> expanded card (State 2). -----
  return (
    <section
      aria-label={regionLabel}
      style={themeVars}
      className={cx(
        "font-sans text-[var(--haw-text)]",
        "fixed bottom-4 z-40 sm:bottom-6",
        sideClass,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ transformOrigin: position === "bottom-left" ? "bottom left" : "bottom right" }}
            className="max-h-[calc(100dvh-2rem)] w-[min(92vw,24rem)]"
          >
            {card}
          </motion.div>
        ) : (
          <Launcher
            key="launcher"
            assistantName={assistantName}
            assistantImage={assistantImage}
            onlineLabel={t.common.online}
            helperLabel={t.common.needHelp}
            openLabel={openLabel}
            onClick={() => setExpanded(true)}
          />
        )}
      </AnimatePresence>

      {modal}
    </section>
  )
}

export default HotelAIWidget
