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
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
