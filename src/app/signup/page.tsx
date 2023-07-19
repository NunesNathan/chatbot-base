"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatbotContext, ISignInData } from "@/context/chatbotContext";
import { Sign } from "@/services/authService";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function SignUp() {
  const [signUpError, setSignUpError] = useState("");
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { setToken, setUser } = useContext(ChatbotContext);

  const onSubmit = async (e: FieldValues) => {
    if (e.confirmPassword !== e.password) {
      setSignUpError("Passwords do not match");
    } else {
      const response = await Sign.SignUp(e as ISignInData);
      if (response?.status && response?.status > 300) {
        setSignUpError((await response?.json()).error);
      } else {
        const { user, token } = await response?.json();
        await setUser(user);
        await setToken(token);
        router.push("/chatbot");
      }
    }
  };

  return (
    <main className="w-full max-w-lg space-y-3">
      <h1 className="text-center text-5xl">Chatbot</h1>
      <h2 className="leading-6 text-center">You are welcome</h2>
      <form
        className="text-black flex-column items-center justify-center space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          required
          {...register("email")}
          type="email"
          placeholder="xxxxxx@xxxxxx.xxx"
        />
        <Input
          required
          {...register("password")}
          type="password"
          placeholder="**********"
        />
        <Input
          required
          {...register("confirmPassword")}
          type="password"
          placeholder="**********"
        />
        <Button
          type="submit"
          className="w-full text-black bg-white hover:text-[#E62415] hover:bg-[#65eaa6]"
        >
          Sign up!
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/")}
          className="w-full text-[#E62415] bg-black hover:text-[#65eaa6] hover:bg-[#E62415]"
        >
          {"Log in =>"}
        </Button>
        {signUpError && (
          <span className="leading-8 text-red-600 font-bold">
            {signUpError}
          </span>
        )}
      </form>
    </main>
  );
}
