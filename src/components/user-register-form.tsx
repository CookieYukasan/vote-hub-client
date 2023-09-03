"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
// import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { authMessages } from "@/config/messages/auth";
import { useFetch } from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/auth";
import Bowser from "bowser";
import { useRouter } from "next/navigation";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof signUpSchema>;
type AuthErrorKeys = keyof typeof authMessages.error;

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const device = Bowser.parse(window.navigator.userAgent);

      const response = await useFetch("auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.toLowerCase(),
          password: data.password,
          userName: data.userName,
          device,
        }),
      });

      if (!response.ok) {
        const authErrorType: AuthErrorKeys =
          response.status === 400 ? "accountExists" : "generic";

        throw new Error(authMessages.error[authErrorType]);
      }

      // const signInResult = await signIn("credentials", {
      //   email: data.email.toLowerCase(),
      //   password: data.password,
      //   device,
      //   redirect: false,
      //   callbackUrl: "/dashboard",
      // });

      const signInResult = true;

      if (!signInResult) throw new Error(authMessages.error.loginFailed);

      toast({
        description: authMessages.success.accountCreated,
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        description: error.message || authMessages.error.generic,
      });
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="userName">
              userName
            </Label>
            <Input
              id="userName"
              placeholder="Username"
              type="userName"
              autoCapitalize="none"
              autoComplete="userName"
              autoCorrect="off"
              disabled={isLoading}
              {...register("userName")}
            />
            {errors?.userName && (
              <p className="px-1 text-xs text-red-600">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
