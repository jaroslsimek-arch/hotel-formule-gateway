"use client"

import { useCallback, useRef } from "react"
import { HotelAIWidget } from "@/components/hotel-ai-widget"

const TYPEBOT_ID = "hotel-formule-obt4hbe"
const TYPEBOT_API_HOST = "https://typebot.io"

declare global {
  interface Window {
    Typebot?: {
      initStandard: (config: {
        typebot: string
        apiHost?: string
        style?: { border?: string; width?: string; height?: string }
      }) => void
    }
  }
}

const TYPEBOT_STYLE_ID = "haw-typebot-style"

/**
 * The <typebot-standard> web component overwrites its own inline `style`
 * attribute when it upgrades, so inline styles don't stick. We instead
 * inject a one-time stylesheet (with !important) that sizes the embed to
 * fill #hotel-ai-chat-container and hides the widget's placeholder text.
 * This lives at the page level and never touches the widget files.
 */
function ensureTypebotStyles() {
  if (document.getElementById(TYPEBOT_STYLE_ID)) return
  const style = document.createElement("style")
  style.id = TYPEBOT_STYLE_ID
  style.textContent = `
    #hotel-ai-chat-container > p { display: none !important; }
    #hotel-ai-chat-container { padding: 0 !important; border-style: solid !important; overflow: hidden !important; }
    #hotel-ai-chat-container typebot-standard {
      display: block !important;
      width: 100% !important;
      height: 70vh !important;
      max-height: 70vh !important;
      border: none !important;
      border-radius: 1rem !important;
    }
  `
  document.head.appendChild(style)
}

export default function HotelFormulePage() {
  // Tracks the polling timer so we can cancel it if the modal closes early.
  const pollRef = useRef<number | null>(null)

  const clearPoll = useCallback(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  /**
   * Injects a <typebot-standard> element into the widget's
   * #hotel-ai-chat-container placeholder and initializes Typebot.
   * Runs only after the modal (and its container) is in the DOM, so
   * we poll briefly until both the container and the Typebot lib exist.
   */
  const mountTypebot = useCallback(() => {
    clearPoll()
    let attempts = 0
    pollRef.current = window.setInterval(() => {
      attempts += 1
      const container = document.getElementById("hotel-ai-chat-container")

      if (container && window.Typebot) {
        clearPoll()

        // Guard against a double mount within the same open session.
        if (container.querySelector("typebot-standard")) return

        ensureTypebotStyles()

        const frame = document.createElement("typebot-standard")
        frame.setAttribute("typebot", TYPEBOT_ID)
        container.appendChild(frame)

        window.Typebot?.initStandard({
          typebot: TYPEBOT_ID,
          apiHost: TYPEBOT_API_HOST,
          style: { border: "none", width: "100%", height: "100%" },
        })
        return
      }

      // Give up after ~3s to avoid an endless timer.
      if (attempts > 60) clearPoll()
    }, 50)
  }, [clearPoll])

  const handleOpenChat = useCallback(() => {
    mountTypebot()
  }, [mountTypebot])

  const handleCloseChat = useCallback(() => {
    // The modal unmounts on close, removing the injected frame with it.
    // Just stop any in-flight polling.
    clearPoll()
  }, [clearPoll])

  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* Desktop backdrop */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: "url(/castle-summer.jpg)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-br from-amber-900/20 via-transparent to-stone-900/30 md:block"
        aria-hidden="true"
      />

      {/* The widget — rendered unchanged. Typebot is wired purely via callbacks. */}
      <div className="relative z-10 w-full max-w-md">
        <HotelAIWidget
          theme="hotel"
          locale="cs"
          mode="inline"
          hotelName="Hotel Formule"
          assistantName="Marta"
          assistantImage="/marta.webp"
          onOpenChat={handleOpenChat}
          onCloseChat={handleCloseChat}
        />
      </div>

      {/* Branding */}
      <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground/70 md:text-white/80">
        Powered by <span className="font-medium">redorwhite AI</span>
      </p>
    </main>
  )
}
