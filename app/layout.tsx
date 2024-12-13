import type { Metadata } from "next";
import "./globals.css";
import "./mapbox-gl.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Weather Application",
  description: "Created by Ahmed Boulakhras",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Weather App" />
        <meta name="author" content="Ahmed Boulakhras" />
        {/* Turf.js plugin */}
        <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
      
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
