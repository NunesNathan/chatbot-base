import { ISignInData } from '@/context/chatbotContext';

export class Sign {
  public static async Login({ email, password }: ISignInData): Promise<Response | undefined> {
    const data = await fetch("api/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    return data;
  }

  public static async SignUp({ email, password }: ISignInData): Promise<Response | undefined > {
    const data = await fetch("api/signup/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    return data;
  }
}