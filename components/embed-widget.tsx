"use client"

import { useCallback, useEffect, useRef } from "react"
import { MartaWidget } from "@/components/marta-widget"

/** Messages this page posts to the host window (via the loader script). */
type EmbedMessage =
  | { source: "haw-embed"; type: "clip"; inset: string }
  | { source: "haw-embed"; type: "fullscreen"; on: boolean }

// Extra padding around the widget's box so drop shadows and the spring
// "overshoot" of the open animation are never clipped.
const CLIP_PADDING = 48

/**
 * EmbedWidget — renders the Marta widget on the standalone `/embed` route and
 * keeps the host page interactive.
 *
 * The host loads this route in a full-viewport, transparent iframe (so the
 * widget's responsive units and full-screen modal resolve against the real
 * device viewport, exactly like a native page). To stop the iframe from
 * swallowing clicks on the rest of the host page, we continuously report the
 * widget's on-screen bounding box; the loader clips the iframe to just that
 * region. When the chat modal opens we ask the loader to remove the clip so
 * the full-screen overlay works, then restore it on close.
 */
export function EmbedWidget() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const fullscreenRef = useRef(false)

  const post = useCallback((message: EmbedMessage) => {
    window.parent?.postMessage(message, "*")
  }, [])

  // Measure the floating widget section and report a clip-path inset.
  const postClip = useCallback(() => {
    if (fullscreenRef.current) return
    const section = wrapperRef.current?.querySelector("section")
    if (!section) return
    const r = section.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const top = Math.max(0, r.top - CLIP_PADDING)
    const left = Math.max(0, r.left - CLIP_PADDING)
    const right = Math.max(0, vw - r.right - CLIP_PADDING)
    const bottom = Math.max(0, vh - r.bottom - CLIP_PADDING)
    post({ source: "haw-embed", type: "clip", inset: `${top}px ${right}px ${bottom}px ${left}px` })
  }, [post])

  const handleChatOpenChange = useCallback(
    (open: boolean) => {
      fullscreenRef.current = open
      post({ source: "haw-embed", type: "fullscreen", on: open })
      if (!open) {
        // After the modal closes, the card is still expanded — re-measure it
        // (a few times, to catch the close animation settling).
        ;[0, 120, 320].forEach((d) => window.setTimeout(postClip, d))
      }
    },
    [post, postClip],
  )

  // Make this route transparent so only the widget paints over the host page.
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.background
    const prevBody = body.style.background
    html.style.background = "transparent"
    body.style.background = "transparent"
    return () => {
      html.style.background = prevHtml
      body.style.background = prevBody
    }
  }, [])

  // Track the widget's size/position and keep the host clip in sync.
  useEffect(() => {
    let observer: ResizeObserver | null = null
    let attempts = 0

    const attach = () => {
      const section = wrapperRef.current?.querySelector("section")
      if (section) {
        observer = new ResizeObserver(() => postClip())
        observer.observe(section)
        postClip()
        return
      }
      // The widget mounts client-side; retry briefly until the section exists.
      if (attempts++ < 40) window.setTimeout(attach, 50)
    }
    attach()

    const onResize = () => postClip()
    window.addEventListener("resize", onResize)
    // Catch the launcher's enter animation and any late layout.
    const timers = [60, 240, 600].map((d) => window.setTimeout(postClip, d))

    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", onResize)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [postClip])

  return (
    <div ref={wrapperRef}>
      <MartaWidget mode="floating" onChatOpenChange={handleChatOpenChange} />
    </div>
  )
}

export default EmbedWidget
