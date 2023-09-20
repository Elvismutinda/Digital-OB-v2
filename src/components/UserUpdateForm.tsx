"use client";

import { toast } from "@/hooks/use-toast";
import { updateUserForm } from "@/lib/validations/user";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";

const UserUpdateForm = () => {
  const { mutate: updateUserPass, isLoading } = useMutation({
    mutationFn: async ({
      password,
      newPassword,
      confirmNewPassword,
    }: updateUserForm) => {
      const payload: updateUserForm = {
        password,
        newPassword,
        confirmNewPassword,
      };

      const { data } = await axios.patch("/api/users/", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Incorrect password.",
            description: "Kindly input your current correct password.",
            variant: "destructive",
          });
        } else if (err.response?.status === 422) {
          return toast({
            title: "Invalid inputs.",
            description:
              "Ensure your new password and confirm new password match.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "An error occurred.",
        description: "Could not update your password. Try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });

      message.success("Kindly login with your new password.");

      // toast({
      //   title: "Success",
      //   description: "Kindly login with your new password.",
      // });
    },
  });

  const onFinish = (values: updateUserForm) => {
    updateUserPass(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Current Password"
        name="password"
        rules={[
          { required: true, message: "Please input your current password!" },
        ]}
      >
        <Input.Password className="max-w-[300px]" name="password" />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password className="max-w-[300px]" name="newPassword" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmNewPassword"
        rules={[
          { required: true, message: "Please confirm your new password!" },
        ]}
      >
        <Input.Password className="max-w-[300px]" name="confirmNewPassword" />
      </Form.Item>
      <Form.Item>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserUpdateForm;
