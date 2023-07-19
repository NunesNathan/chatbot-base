"use client";
import { IChat } from "@/services/chatBotService";
import React, { createContext, useState } from "react";

interface IChatContextProps {
  user: IUserInfo;
  setUser: React.Dispatch<React.SetStateAction<IUserInfo>>;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  messages: IChat[];
  setMessages: React.Dispatch<React.SetStateAction<IChat[]>>;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IUserInfo {
  id: string;
  avatar: string | null;
  email: string;
}

export const ChatbotContext = createContext({} as IChatContextProps);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserInfo>({} as IUserInfo);
  const [token, setToken] = useState<string>();
  const [messages, setMessages] = useState<IChat[]>([]);

  return (
    <ChatbotContext.Provider
      value={{ user, setUser, token, setToken, messages, setMessages }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
