import { HotelAIWidget } from "@/components/hotel-ai-widget"

export default function TestWidgetPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <HotelAIWidget
        mode="floating"
        position="bottom-right"
      />
    </main>
  )
}