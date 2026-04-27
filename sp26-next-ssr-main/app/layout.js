import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AuthButton from "./components/AuthButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokémon Party Builder",
  description: "Build your dream team of up to 6 Pokémon and share it with the world!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <nav className="navbar">
            <a href="/" className="nav-logo">🔴 Poké Partner</a>
            <div className="nav-links">
              <a href="/">Search</a>
              <a href="/party">Your Party</a>
              <a href="/parties">All Parties</a>
            </div>
            <AuthButton />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
