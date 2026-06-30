"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

declare global {
  interface Window {
    Typebot: {
      initStandard: (config: {
        typebot: string
        apiHost?: string
        style?: {
          border?: string
          width?: string
          height?: string
        }
      }) => void
    }
  }
}

export default function HotelFormulePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [typebotReady, setTypebotReady] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const initializeTypebot = useCallback(() => {
    if (typeof window !== "undefined" && window.Typebot && !typebotReady) {
      try {
        window.Typebot.initStandard({
          typebot: "hotel-formule-obt4hbe",
          apiHost: "https://typebot.io",
          style: {
            border: "none",
            width: "100%",
            height: "100%"
          }
        })
        setTypebotReady(true)
      } catch (error) {
        console.log("[v0] Typebot initialization error:", error)
      }
    }
  }, [typebotReady])

  useEffect(() => {
    // Show splash for 1.5 seconds, then trigger Typebot
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
      // Trigger slide-in animation
      setTimeout(() => {
        setShowChat(true)
        initializeTypebot()
      }, 100)
    }, 1500)

    return () => clearTimeout(splashTimer)
  }, [initializeTypebot])

  const handleScreenClick = () => {
    if (!typebotReady) {
      setShowChat(true)
      initializeTypebot()
    }
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      onClick={handleScreenClick}
    >
      {/* Desktop: Background Image with Overlay (left side) */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src="/castle-summer.jpg"
          alt="Letní pohled na zámek - Hotel Formule"
          fill
          className="object-cover sepia-[0.15] contrast-[1.05] brightness-[0.95] saturate-[0.9]"
          priority
        />
        {/* Vintage patina overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-stone-900/25" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hotel branding on desktop background */}
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-light tracking-wide mb-2">Hotel Formule</h2>
          <p className="text-sm text-white/70 tracking-widest uppercase">
            Powered by redorwhite AI
          </p>
        </div>
      </div>

      {/* Splash Screen */}
      <div
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out ${
          showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 px-6">
          {/* Marta Photo with Online Indicator */}
          <div className="relative mb-8">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              <Image
                src="/marta.webp"
                alt="Marta - AI Asistentka"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
              />
              {/* Pulsing Online Indicator */}
              <div className="absolute bottom-2 right-2 flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-accent/40 animate-ping" />
                <span className="relative w-4 h-4 rounded-full bg-accent border-2 border-background" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-2xl md:text-3xl font-light text-foreground text-center tracking-wide mb-2">
            Ahoj, jsem Marta
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center font-light">
            vaše AI asistentka
          </p>

          {/* Subtle loading indicator */}
          <div className="mt-12 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce" />
          </div>
        </div>

        {/* Branding Footer */}
        <div className="pb-8 md:pb-12">
          <p className="text-xs text-muted-foreground/60 tracking-widest uppercase">
            Powered by{" "}
            <span className="font-medium text-muted-foreground/80">redorwhite AI</span>
          </p>
        </div>
      </div>

      {/* Typebot Container - Responsive: Fullscreen on mobile, sidebar on desktop */}
      <div
        id="typebot-container"
        className={`
          fixed z-40 bg-background
          transition-transform duration-500 ease-out
          
          /* Mobile: Full screen */
          inset-0 w-full h-full
          
          /* Desktop: Right sidebar 450px */
          md:inset-auto md:right-0 md:top-0 md:w-[450px] md:h-full
          md:shadow-2xl md:border-l md:border-border
          
          ${showChat ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <typebot-standard
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block"
          }}
        />
      </div>
    </div>
  )
}
