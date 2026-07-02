import type { Metadata, Viewport } from 'next'
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
      <head>
        {/* Loads the Typebot web component library and registers
            window.Typebot (initStandard) plus the <typebot-standard> element
            that the widget mounts into #hotel-ai-chat-container. */}
        <script
          src="https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js"
          type="module"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
