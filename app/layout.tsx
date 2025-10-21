import "./globals.css";
import { sfMono } from "./_components/fonts/fonts";
import Background from "@/components/background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfMono.className} dark antialiased w-screen h-screen overflow-hidden`}>
        <Background />
        <div className="snap-container relative z-10 flex flex-col overflow-x-hidden overflow-y-scroll h-screen snap-y scroll-smooth">
          {children}
        </div>
      </body>
    </html>
  );
}
