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
 * inject a one-time stylesheet (with !important) that sizes the embed so it
 * fills the widget's existing #hotel-ai-chat-container and hides the dashed
 * placeholder. This only styles the embed inside the existing modal container
 * — it does not create a separate/fullscreen container.
 */
function ensureTypebotStyles() {
  if (document.getElementById(TYPEBOT_STYLE_ID)) return
  const style = document.createElement("style")
  style.id = TYPEBOT_STYLE_ID
  style.textContent = `
    #hotel-ai-chat-container > p { display: none !important; }
    #hotel-ai-chat-container {
      display: block !important;
      padding: 0 !important;
      border: none !important;
      overflow: hidden !important;
    }
    #hotel-ai-chat-container typebot-standard {
      display: block !important;
      width: 100% !important;
      height: 60vh !important;
      max-height: 60vh !important;
      border: none !important;
      border-radius: 1rem !important;
    }
  `
  document.head.appendChild(style)
}

export default function HotelFormulePage() {
  // Tracks the polling timer so we can cancel it if the modal closes early.
  const pollRef = useRef<number | null>(null)
  // The <typebot-standard> element we inject, so we can tear it down ourselves.
  const frameRef = useRef<HTMLElement | null>(null)
  // True while a close is settling, to block a late poll tick from re-mounting.
  const closingRef = useRef(false)

  const clearPoll = useCallback(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  /**
   * Destroys the Typebot instance: removes the injected <typebot-standard>
   * element from the existing #hotel-ai-chat-container. We do this ourselves
   * (rather than relying on React to unmount the container) because the
   * element is a foreign DOM node appended into a React-owned container —
   * letting React remove it can throw a reconciliation error and leave the
   * modal stuck open.
   */
  const destroyTypebot = useCallback(() => {
    const frame = frameRef.current
    if (frame?.parentNode) {
      frame.parentNode.removeChild(frame)
    }
    frameRef.current = null
  }, [])

  /**
   * Injects a <typebot-standard> element into the widget's existing
   * #hotel-ai-chat-container placeholder and initializes Typebot. Runs only
   * after the modal (and its container) is in the DOM, so we poll briefly
   * until both the container and the Typebot lib exist.
   */
  const mountTypebot = useCallback(() => {
    clearPoll()
    let attempts = 0
    pollRef.current = window.setInterval(() => {
      attempts += 1

      // A close started while we were polling — abort, don't mount.
      if (closingRef.current) {
        clearPoll()
        return
      }

      const container = document.getElementById("hotel-ai-chat-container")

      if (container && window.Typebot) {
        clearPoll()

        // Guard against a double mount within the same open session.
        if (container.querySelector("typebot-standard")) return

        ensureTypebotStyles()

        const frame = document.createElement("typebot-standard")
        frame.setAttribute("typebot", TYPEBOT_ID)
        container.appendChild(frame)
        frameRef.current = frame

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
    // Starting a fresh session — clear any leftover closing guard and
    // initialize a brand-new Typebot instance.
    closingRef.current = false
    mountTypebot()
  }, [mountTypebot])

  const handleCloseChat = useCallback(() => {
    // Block a late poll tick from re-mounting during teardown, and prevent
    // the modal from "immediately reopening".
    closingRef.current = true
    clearPoll()
    // Destroy the Typebot element ourselves before React unmounts the modal,
    // so React never tries to remove a foreign DOM node it doesn't own.
    destroyTypebot()
    // Release the guard on the next tick, once the close has settled.
    window.setTimeout(() => {
      closingRef.current = false
    }, 300)
  }, [clearPoll, destroyTypebot])

  return (
    <main className="relative min-h-[100dvh] w-full bg-background">
      {/* Simple page content. The widget floats over it as a launcher. */}
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Hotel Formule
        </p>
        <h1 className="mt-3 text-balance font-serif text-3xl text-foreground sm:text-4xl">
          Vítejte v Hotelu Formule
        </h1>
        <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted-foreground">
          Naše AI asistentka Marta je tu pro vás. Otevřete chat v pravém dolním rohu a zeptejte se na
          ubytování, recepci nebo cokoli dalšího — ráda vám pomůže.
        </p>
      </div>

      {/* The existing widget — floating launcher in the bottom-right corner.
          Typebot is wired purely via the onOpenChat / onCloseChat callbacks. */}
      <HotelAIWidget
        theme="hotel"
        locale="cs"
        mode="floating"
        position="bottom-right"
        hotelName="Hotel Formule"
        assistantName="Marta"
        assistantImage="/marta.webp"
        onOpenChat={handleOpenChat}
        onCloseChat={handleCloseChat}
      />
    </main>
  )
}
