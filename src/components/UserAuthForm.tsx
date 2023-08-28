"use client";

import { loginUserForm, loginUserSchema } from "@/lib/validations/user";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader2 } from "react-icons/lu";
import { Button, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserAuthForm = () => {
  const router = useRouter();

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

    const { data: session } = await useSession();

    // Check if the user is authenticated and has a role
    if (session && session.user && session.user.role) {
      switch (session.user.role) {
        case "Admin":
          router.push("/admin");
          break;
        case "Incharge":
          router.push("/incharge");
          break;
        case "Police":
          router.push("/police");
          break;
        case "Detective":
          router.push("/detective");
          break;
        default:
          // Handle other roles or scenarios
          break;
      }
    }

    return toast({
      title: "Successfully logged in",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input size="large" {...field} placeholder="Email Address" />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input.Password
            size="large"
            {...field}
            placeholder="*****************"
          />
        )}
      />
      <Button disabled={isLoading} htmlType="submit">
        {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </form>
  );
};

export default UserAuthForm;
