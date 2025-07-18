
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex-grow bg-gray-100">{children}</main>
        </body>
    </html>
  )
}