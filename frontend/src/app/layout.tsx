import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI SQL Analyst',
  description: 'AI-powered SQL analysis tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
