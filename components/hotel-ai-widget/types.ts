import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import type { Locale } from "./i18n"
import type { ThemeName } from "./themes"

export type { Locale } from "./i18n"
export type { ThemeName } from "./themes"

/** How the widget is presented. */
export type WidgetMode = "floating" | "inline"

/** Corner used when `mode="floating"`. */
export type WidgetPosition = "bottom-right" | "bottom-left"

/**
 * A single quick-action card shown in the widget.
 */
export interface QuickAction {
  /** Unique id (used as React key). */
  id: string
  /** Short label, e.g. "Accommodation". */
  label: string
  /** Optional one-line description shown under the label. */
  description?: string
  /** A Lucide icon component, e.g. `BedDouble`. */
  icon: LucideIcon
  /** Optional click handler. */
  onClick?: () => void
  /** Optional link. When set, the card renders as an anchor. */
  href?: string
}

/**
 * Props for the HotelAIWidget. Everything is configurable so the
 * component can be dropped into any project without edits. Sensible
 * defaults come from the active `theme` and `locale`.
 */
export interface HotelAIWidgetProps {
  // --- Presentation -------------------------------------------------------
  /** Visual preset: hotel, print, wine, municipality or education. */
  theme?: ThemeName
  /** UI language. Falls back to English for any missing string. */
  locale?: Locale
  /** "floating" shows a launcher + expandable card; "inline" renders the card directly. */
  mode?: WidgetMode
  /** Corner for floating mode. */
  position?: WidgetPosition
  /** Render the card already expanded (floating mode only). */
  defaultOpen?: boolean

  // --- Identity / copy ----------------------------------------------------
  /** Name of the business (used for ARIA labels & default copy). */
  hotelName?: string
  /** Display name of the assistant, e.g. "Marta". */
  assistantName?: string
  /** Role of the assistant. Overrides the theme/locale default. */
  assistantTitle?: string
  /** URL of the assistant's avatar image. Falls back to initials. */
  assistantImage?: string
  /** Optional decorative hero image shown behind the header. */
  heroImage?: string
  /** Heading of the welcome message. Overrides the theme/locale default. */
  welcomeTitle?: string
  /** Body of the welcome message. Overrides the theme/locale default. */
  welcomeText?: string
  /** Label for the main CTA button. Overrides the locale default. */
  buttonLabel?: string

  // --- Colors -------------------------------------------------------------
  /** Primary brand color (any valid CSS color). Overrides the theme. */
  primaryColor?: string
  /** Accent color (any valid CSS color). Overrides the theme. */
  accentColor?: string

  // --- Content ------------------------------------------------------------
  /** Quick action cards. Defaults to the active theme's set (localized). */
  quickActions?: QuickAction[]
  /**
   * Optional content rendered inside the modal, below the chat
   * placeholder container. Use this to mount your own chat UI.
   */
  children?: ReactNode

  // --- Callbacks ----------------------------------------------------------
  /** Called when the chat modal opens. */
  onOpenChat?: () => void
  /** Called when the chat modal closes. */
  onCloseChat?: () => void

  /** Optional extra className for the outer card. */
  className?: string
}
