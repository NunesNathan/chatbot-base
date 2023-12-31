import { Chat } from '@prisma/client';

export type IChat = Pick<Chat, "text" | "userId" | "response"> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date;
}

export class ChatBot {
  public static async GetMessages(id: string): Promise<IChat[] | undefined> {
    const data = await fetch(`api/chat/?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return (await data.json()).chats;
  }

  public static async SaveMessage(message: IChat): Promise<IChat | undefined > {
    await fetch("api/chat/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    return message;
  }

  public static async SaveMessages(id: string, messages: IChat[]): Promise<IChat[] | undefined > {
    await fetch(`api/chat/?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    });

    return messages;
  }

  public static async GetCSV(id: string): Promise<string | undefined> {
    const data = await (await fetch(`api/chat/?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();

    const getted = await data.chats as IChat[];
    const a = getted.find(({ finishedAt }) => finishedAt !== null) as IChat;
    const date = new Date(a.finishedAt as Date).toLocaleDateString('en-US')
    const mapped = [] as string[];
    getted.forEach(({ createdAt, text, response }) => {
      mapped.push(`${createdAt};${text.replaceAll(/ |\n/g, '')};${response.replaceAll(/ |\n/g, '')};\n`)
    })

    console.log(mapped)

    return `List separator=;
      Chat finished on ${await date};
      created at;text;response;
      ${mapped.join("")}
    `;
  }

  public static GenerateResponse(inputValue: string) {
    (() => new Promise(resolve => setTimeout(resolve, 700)))();
    if (["hello", "good", "i want"].includes(inputValue.toLocaleLowerCase())) {
      return [`Hi name! 👋🏾
      I'm your loan assistant.
      How can I help?`,
      ]
    } else if (["loan", "loans"].includes(inputValue.toLocaleLowerCase())) {
      return [`
        Here are some of good options for you to get started:
      `,
        [
          { option: "Do you want to apply for a loan?", response: "Consider affordability, purpose, interest rate, and credit score before applying for a loan. Seek advice if unsure." },
          { option: "Loan conditions", response: "all the conditions of our loans have been sent to your email!" },
          { option: "Help", response: "No worries, our team will contact you soon." },
      ]]
    } else if ("goodbye" === inputValue.toLocaleLowerCase()) {
      return ["See you, name!"]
    } else {
      return ["I can't help with that yet!"]
    }
  }
}