import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "FirstCraft Office Supplies",
  description: "Your one-stop shop for office supplies",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
