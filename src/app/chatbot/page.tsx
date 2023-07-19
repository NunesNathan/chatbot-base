"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatbotContext } from "@/context/chatbotContext";
import ChatMessage from "@/components/chatMessage";
import { ChatBot, IChat } from "@/services/chatBotService";
import { Chat } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Chat() {
  const { messages, user, setMessages } = useContext(ChatbotContext);
  const [inputValue, setInputValue] = useState("");
  const [enableToCopy, setEnableToCopy] = useState(false);
  const [responseOptions, setLinkOptions] = useState<
    {
      option: string;
      response: string;
    }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const a = await ChatBot.GetMessages(user.id);
      if (a) {
        setMessages(a);
      }
    })();
  }, [setMessages, user.id]);

  const sendMessage = async () => {
    const response = ChatBot.GenerateResponse(inputValue);
    const saved = await ChatBot.SaveMessage({
      userId: user.id,
      text: inputValue,
      response: (response[0] as string).replace(
        "name",
        user.email.split("@")[0]
      ),
    });

    if (saved) {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].text === "I can't help with that yet!"
      ) {
        messages.pop();
      }
      if (response[0] === "See you, name!") {
        saved.finishedAt = new Date();
        console.log(saved);
        setMessages([...messages, saved]);
        hasFinished();
      }
      if (response[1]?.length > 0) {
        setLinkOptions(
          response[1] as Array<{ option: string; response: string }>
        );
      }
      setMessages([...messages, saved]);

      setInputValue("");
      await ChatBot.SaveMessages(user.id, messages);
    }
  };

  const hasFinished = () => {
    if (messages.some(({ finishedAt }) => !!finishedAt)) {
      setEnableToCopy(true);
      console.log("asdasdasdasd");
    } else {
      setEnableToCopy(false);
    }
  };

  const getCSV = async () => {
    const csv = (await ChatBot.GetCSV(user.id)) as string;
    return navigator.clipboard.writeText(await csv);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[440px] h-[590px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader className="flex-row justify-between">
          <CardTitle>Loan chatbot</CardTitle>
          <CardContent>
            <Button disabled={!enableToCopy} onClick={getCSV}>
              CSV
            </Button>
          </CardContent>
        </CardHeader>

        <CardContent className="overflow-y-auto space-y-3">
          {messages &&
            messages.map((message) => (
              <>
                <ChatMessage key={message.id} user={user} text={message.text} />
                <ChatMessage
                  key={message.id + "- bot"}
                  user={{ email: "LA@", id: "0", avatar: null }}
                  text={message.response}
                />
              </>
            ))}
          {responseOptions && (
            <div className="flex space-x-2 w-full">
              {responseOptions.map(({ response, option }) => (
                <Button
                  onClick={() => {
                    setLinkOptions([]);
                    messages[messages.length - 1].text = "loan - " + option;
                    messages[messages.length - 1].response = response;
                    setMessages(messages);
                  }}
                  key={option}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex space-x-2 w-full">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`try "Hello", "Good", "loan", "Goodbye"`}
          />
          <Button
            className="text-white bg-black hover:text-[#E62415] hover:bg-[#65eaa6]"
            onClick={sendMessage}
            type="button"
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
