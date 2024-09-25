import Navbar from "../components/Navbar"
import "../styles/globals.css" // Import global styles

export const metadata = {
  title: "HR Management App",
  description: "A comprehensive HR management application."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto py-4">{children}</main>
      </body>
    </html>
  )
}
