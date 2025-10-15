import "./globals.css";
import { sfMono } from "./_components/fonts/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
