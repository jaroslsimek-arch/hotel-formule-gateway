/**
 * Theme presets for the Redorwhite AI Widget.
 *
 * A theme only changes the *look* — palette, default icon set and the
 * assistant's role. The component logic is identical across all themes.
 * Every palette stays warm and human (soft surfaces, cream tints, gentle
 * shadows); no neon, no harsh futuristic colors.
 */

import {
  BedDouble,
  UtensilsCrossed,
  Wine,
  Mountain,
  CircleParking,
  Phone,
  Printer,
  FileText,
  Package,
  Truck,
  GlassWater,
  Grape,
  ShoppingBag,
  Clock,
  Trash2,
  CalendarDays,
  GraduationCap,
  ClipboardList,
  Utensils,
  type LucideIcon,
} from "lucide-react"
import type { RoleKey } from "./i18n"

export type ThemeName = "hotel" | "print" | "wine" | "municipality" | "education"

/** The full set of CSS custom properties the widget renders with. */
export interface ThemePalette {
  primary: string
  accent: string
  bg: string
  surface: string
  text: string
  muted: string
  border: string
  online: string
}

/** An action belonging to a theme: a translation id + its icon. */
export interface ThemeAction {
  id: string
  icon: LucideIcon
}

export interface ThemeDefinition {
  name: ThemeName
  role: RoleKey
  palette: ThemePalette
  actions: ThemeAction[]
}

// Shared warm neutrals reused across themes for a consistent, human feel.
const WARM_NEUTRALS = {
  bg: "#f7f4ec",
  surface: "#fffdf8",
  text: "#26302a",
  muted: "#6f7a70",
  border: "#e7e1d3",
  online: "#5aa36b",
}

export const THEMES: Record<ThemeName, ThemeDefinition> = {
  hotel: {
    name: "hotel",
    role: "concierge",
    palette: { ...WARM_NEUTRALS, primary: "#3f6b4f", accent: "#c2854a" },
    actions: [
      { id: "accommodation", icon: BedDouble },
      { id: "restaurant", icon: UtensilsCrossed },
      { id: "wine", icon: Wine },
      { id: "trips", icon: Mountain },
      { id: "parking", icon: CircleParking },
      { id: "reception", icon: Phone },
    ],
  },
  print: {
    name: "print",
    role: "sales",
    palette: {
      ...WARM_NEUTRALS,
      bg: "#f6f3f1",
      surface: "#fffdfc",
      text: "#2c2422",
      muted: "#7c716c",
      border: "#e7ddd8",
      primary: "#b23b3b",
      accent: "#3f6b4f",
    },
    actions: [
      { id: "products", icon: Printer },
      { id: "quote", icon: FileText },
      { id: "samples", icon: Package },
      { id: "delivery", icon: Truck },
      { id: "contact", icon: Phone },
    ],
  },
  wine: {
    name: "wine",
    role: "sales",
    palette: {
      ...WARM_NEUTRALS,
      bg: "#f6f1ef",
      surface: "#fffcfb",
      text: "#2b1f24",
      muted: "#7a6a70",
      border: "#e6d9da",
      primary: "#7d2740",
      accent: "#b8893f",
    },
    actions: [
      { id: "wines", icon: Wine },
      { id: "tasting", icon: GlassWater },
      { id: "vineyard", icon: Grape },
      { id: "shop", icon: ShoppingBag },
      { id: "contact", icon: Phone },
    ],
  },
  municipality: {
    name: "municipality",
    role: "clerk",
    palette: {
      ...WARM_NEUTRALS,
      bg: "#eef2f4",
      surface: "#fbfdfe",
      text: "#202a31",
      muted: "#647179",
      border: "#dbe3e8",
      primary: "#356681",
      accent: "#3f6b4f",
    },
    actions: [
      { id: "documents", icon: FileText },
      { id: "hours", icon: Clock },
      { id: "waste", icon: Trash2 },
      { id: "events", icon: CalendarDays },
      { id: "contact", icon: Phone },
    ],
  },
  education: {
    name: "education",
    role: "tutor",
    palette: {
      ...WARM_NEUTRALS,
      bg: "#f5f3ee",
      surface: "#fffefb",
      text: "#2a2820",
      muted: "#73705f",
      border: "#e6e0d2",
      primary: "#3f6b4f",
      accent: "#c2854a",
    },
    actions: [
      { id: "courses", icon: GraduationCap },
      { id: "enrollment", icon: ClipboardList },
      { id: "schedule", icon: CalendarDays },
      { id: "canteen", icon: Utensils },
      { id: "contact", icon: Phone },
    ],
  },
}

export function getTheme(name: ThemeName): ThemeDefinition {
  return THEMES[name] ?? THEMES.hotel
}
