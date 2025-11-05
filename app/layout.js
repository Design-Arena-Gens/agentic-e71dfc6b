export const metadata = {
  title: 'Glass Banana - Cinematic ASMR',
  description: 'Hyper-realistic cinematic close-up of a transparent glass banana',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
