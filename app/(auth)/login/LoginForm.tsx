"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/app/(auth)/login/login.action";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormShape {
  email: string;
  password: string;
}

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const router = useRouter();

  const { register, handleSubmit } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = (data) => {
    startTransition(async () => {
      const response = await login({ ...data });
      if (response.error) {
        switch (response.error) {
          // case "email-not-confirmed":
          //   toast({
          //     title: "Email not confirmed",
          //     description: "Please check your inbox",
          //     variant: "destructive",
          //   });
          //   break;
          case "invalid-credentials":
            toast({
              title: "Invalid credentials",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Unknown error",
              description: "Please try again later",
              variant: "destructive",
            });
        }
      } else if (response.success) {
        router.push("/");
        router.refresh();
      }
    });
  };
  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Image
        src="/Ehre-bright.svg"
        alt="Ehre logo"
        width={200}
        height={200}
        className="block mx-auto"
      />
      <Input
        placeholder="Email"
        type="email"
        defaultValue=""
        {...register("email", {
          required: true,
        })}
      />
      <Input
        type="password"
        placeholder="Password"
        defaultValue=""
        {...register("password", {
          required: true,
        })}
      />
      <Button type="submit" className="block w-full" disabled={isPending}>
        Sign in
      </Button>
      <Separator />
      <Link className={buttonVariants({ variant: "outline" })} href="/signup">
        Sign up
      </Link>
    </form>
  );
}

export default LoginForm;
