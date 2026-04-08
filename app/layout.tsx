import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Helios NRG GmbH | Renewable Energy Finance & Project Management',
  description: 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and Africa. $12B+ capital deployed, 18 GW capacity under management.',
  keywords: 'renewable energy project finance, utility scale solar development, clean energy infrastructure investment, energy transition project management',
  icons: {
    icon: '/images/heliosngrlogo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@100;200;300;400;500;600;700;800;900;1000&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body overflow-x-hidden">{children}</body>
    </html>
  )
}
