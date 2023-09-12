"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";
import { loginUserForm, loginUserSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "antd";
import { useToast } from "@/hooks/use-toast";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { LuLoader2 } from "react-icons/lu";
// import { FaGoogle } from "react-icons/fa";

const UserAuthForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const { toast } = useToast();

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
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again later.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Success",
      description: "You have successfully logged in.",
    });
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
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button> */}
    </div>
  );
};

export default UserAuthForm;
