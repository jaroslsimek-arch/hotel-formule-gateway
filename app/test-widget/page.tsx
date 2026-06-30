import { HotelAIWidget } from "@/components/hotel-ai-widget"

export default function TestWidgetPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <HotelAIWidget
        theme="hotel"
        mode="floating"
        position="bottom-right"

        assistantName="Marta"
        assistantTitle="AI recepční"
        assistantImage="/marta.webp"

        hotelName="Hotel Formule"
      />
    </main>
  )
}
