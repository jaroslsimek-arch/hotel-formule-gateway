import type { Metadata } from "next"
import { EmbedWidget } from "@/components/embed-widget"

// The embed route is meant to be loaded inside the host site's iframe only.
export const metadata: Metadata = {
  title: "Marta — Hotel Formule",
  robots: { index: false, follow: false },
}

export default function EmbedPage() {
  return <EmbedWidget />
}
