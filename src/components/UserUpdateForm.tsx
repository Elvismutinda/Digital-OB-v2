"use client";

import { signOut } from "next-auth/react";
import { updateUserForm } from "@/lib/validations/user";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "./ui/Button";

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
          message.error("Current password is incorrect.");
        } else if (err.response?.status === 422) {
          message.error("New password and confirm password must match.");
        }
      }

      message.error("An error occurred. Try again later.");
    },
    onSuccess: () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });

      message.success("Kindly login with your new password.");
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
