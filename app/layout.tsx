import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hotel Formule | AI Asistentka Marta',
  description: 'Vaše AI asistentka pro Hotel Formule - powered by redorwhite AI',
  generator: 'redorwhite AI',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className="font-sans antialiased">
        {/* Správné načtení Typebot knihovny přes Next.js Script */}
        <Script
          id="typebot-web"
          src="https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js"
          strategy="afterInteractive"
          type="module"
          onLoad={() => {
            // Inicializace Bubble ihned po načtení skriptu
            if (window.Typebot) {
              window.Typebot.initBubble({
                typebot: "hotel-formule-marta", // ID tvého typebotu
                // Pokud schováváš výchozí modré tlačítko a řešíš vlastní pozici / rozměry:
                theme: {
                  button: {
                    backgroundColor: "transparent", // Skrytí defaultního pozadí tlačítka
                    customCss: "bottom: 20px; right: 20px; box-shadow: none;" // Fixní umístění vpravo dole
                  }
                }
              });
            }
          }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  )
}
