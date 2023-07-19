"use client";
import { ChatbotContext } from "@/context/chatbotContext";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useContext(ChatbotContext);

  if (!user?.id && path !== "/signup") {
    router.push("/");
  }
  return <>{children}</>;
}
