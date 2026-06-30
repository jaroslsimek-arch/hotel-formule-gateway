"use client"

import { useState } from "react"
import { cx, initialsFromName } from "./utils"

interface AssistantAvatarProps {
  name: string
  image?: string
  /** Pixel size of the avatar (square). */
  size?: number
  /** Show the small "online" dot. */
  online?: boolean
  className?: string
}

/**
 * Round assistant avatar with an elegant initials fallback and an
 * optional "online" presence indicator.
 */
export function AssistantAvatar({
  name,
  image,
  size = 64,
  online = false,
  className,
}: AssistantAvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(image) && !failed

  return (
    <div
      className={cx("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full ring-2 ring-[var(--haw-surface)] shadow-[0_6px_20px_-8px_rgba(40,60,40,0.45)]"
        style={{ backgroundColor: "color-mix(in srgb, var(--haw-primary) 14%, var(--haw-surface))" }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image || "/placeholder.svg"}
            alt={`${name}, your digital concierge`}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-serif font-medium leading-none"
            style={{
              color: "var(--haw-primary)",
              fontSize: Math.round(size * 0.4),
            }}
          >
            {initialsFromName(name)}
          </span>
        )}
        {!showImage && <span className="sr-only">{name}</span>}
      </div>

      {online && (
        <span
          className="absolute bottom-0.5 right-0.5 block rounded-full ring-2 ring-[var(--haw-surface)]"
          style={{
            width: Math.max(10, Math.round(size * 0.18)),
            height: Math.max(10, Math.round(size * 0.18)),
            backgroundColor: "var(--haw-online)",
          }}
        >
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-60"
            style={{ backgroundColor: "var(--haw-online)" }}
          />
        </span>
      )}
    </div>
  )
}
