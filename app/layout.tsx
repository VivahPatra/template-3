import type { Metadata } from 'next'
import { Playfair_Display, Lora, Inter } from 'next/font/google'
import './globals.css'
import { weddingData } from '@/data/wedding-data'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${weddingData.groomName} & ${weddingData.brideName} — Wedding`,
  description: weddingData.invitationText,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        {children}
      </body>
    </html>
  )
}
