import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata = {
  title: 'Product List',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
