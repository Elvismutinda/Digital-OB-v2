"use client";

import { loginUserForm, loginUserSchema } from "@/lib/validations/user";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader2 } from "react-icons/lu";
import { Input } from "antd";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";

const UserAuthForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: loginUserForm) => {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again later.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Successfully logged in",
    });
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: "Please enter your email" }}
        render={({ field, fieldState }) => (
          <div>
            <Input
              size="large"
              {...field}
              placeholder="Email Address"
              className={fieldState.invalid ? "ant-input-error" : ""}
            />
            {fieldState.invalid && (
              <span className="ant-form-item-explain">
                {fieldState?.error?.message}
              </span>
            )}
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: "Please enter your password" }}
        render={({ field }) => (
          <div>
            <Input.Password
              size="large"
              {...field}
              placeholder="*****************"
            />
          </div>
        )}
      />

      <button
        className={cn(buttonVariants())}
        disabled={isLoading}
        type="submit"
      >
        {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </button>
    </form>
  );
};

export default UserAuthForm;
