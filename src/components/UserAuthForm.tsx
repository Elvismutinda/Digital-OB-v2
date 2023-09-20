"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";
import { loginUserForm, loginUserSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, message } from "antd";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { LuLoader2 } from "react-icons/lu";

const UserAuthForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: loginUserForm) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    });

    // console.log("Result: ", signInResult);

    setIsLoading(false);

    if (!signInResult?.ok) {
      message.error("Sign in request failed. Try again later.");
    }

    message.success("Login successful.");
  }

  return (
    <div>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <Input
                autoComplete="email"
                size="large"
                {...field}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="px-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <Input.Password
                autoComplete="off"
                size="large"
                {...field}
                placeholder="*****************"
              />
              {errors.password && (
                <p className="px-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </button>
      </form>
    </div>
  );
};

export default UserAuthForm;
