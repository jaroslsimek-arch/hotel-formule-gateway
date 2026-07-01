import { MartaWidget } from "@/components/marta-widget"

export default function HotelFormulePage() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-background">
      {/* Simple page content. The widget floats over it as a launcher. */}
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Hotel Formule
        </p>
        <h1 className="mt-3 text-balance font-serif text-3xl text-foreground sm:text-4xl">
         🔥 TEST BUILD 999
        </h1>
        <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted-foreground">
          Naše AI asistentka Marta je tu pro vás. Otevřete chat v pravém dolním rohu a zeptejte se na
          ubytování, recepci nebo cokoli dalšího — ráda vám pomůže.
        </p>
      </div>

      {/* The existing widget — floating launcher in the bottom-right corner.
          Typebot is wired purely via the widget's onOpenChat / onCloseChat. */}
      <MartaWidget mode="floating" />
    </main>
  )
}
