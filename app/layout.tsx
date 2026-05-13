import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dan Bandera — WordPress Developer',
  description:
    'Custom WordPress solutions — from pixel-perfect themes and Gutenberg blocks to powerful plugins.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
