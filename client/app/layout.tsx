import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ML Reference",
  description: "Tool to streamline negnineers access to sceintific research in AI and ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className="container flex m-auto h-screen justify-center items-start">{children}</div>
        </div>
      </body>
    </html>
  );
}
