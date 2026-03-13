import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Helio Aegis | Renewable Energy Finance & Project Management',
  description: 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and MENA. $12B+ capital deployed, 18 GW capacity under management.',
  keywords: 'renewable energy project finance, utility scale solar development, clean energy infrastructure investment, energy transition project management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
