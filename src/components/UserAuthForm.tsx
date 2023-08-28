"use client";

import { cn } from "@/lib/utils";
import { loginUserForm, loginUserSchema } from "@/lib/validations/user";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader2 } from "react-icons/lu";
import { Button, Form, Input } from "antd";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: loginUserForm) => {};

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input {...register("email")} disabled={isSubmitting} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password {...register("password")} disabled={isSubmitting} />
          </Form.Item>
          <Form.Item>
            <Button disabled={isSubmitting} htmlType="submit">
              {isSubmitting && (
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </Form.Item>
        </Form>
      </form>
    </div>
  );
};

export default UserAuthForm;
