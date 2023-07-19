import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserInfo } from "@/context/chatbotContext";

export default function ChatMessage({
  user,
  text,
}: {
  user: IUserInfo;
  text: string;
}) {
  const splitedEmail = user.email.split("@")[0];
  const [f, b] = [
    splitedEmail.charAt(0),
    splitedEmail.charAt(splitedEmail.length - 1),
  ];
  return (
    <div className="flex gap-3 text-slate-600 text-sm">
      <Avatar>
        <AvatarFallback>{`${f}${b}`.toLocaleUpperCase()}</AvatarFallback>
        <AvatarImage src={user.avatar || ""} />
      </Avatar>
      <p className="leading-relaxed">
        <span className="block font-bold text-slate-700">
          {splitedEmail.toLocaleUpperCase()}
        </span>
        {text}
      </p>
    </div>
  );
}
