"use client";
import React, { createContext, useState } from "react";

interface IChatContextProps {
  user: IUserInfo;
  setUser: React.Dispatch<React.SetStateAction<IUserInfo>>;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
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

  return (
    <ChatbotContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </ChatbotContext.Provider>
  );
}
