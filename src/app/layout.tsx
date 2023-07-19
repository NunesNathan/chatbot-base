import { ChatbotContext, ChatbotProvider } from "@/context/chatbotContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "We take development to the next level 🚀",
  description: "Next chatbot mvp for Lexart Labs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ChatbotProvider>
        <body className={inter.className}>{children}</body>
      </ChatbotProvider>
    </html>
  );
}
