"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { Button, Form, Input, Select } from "antd";
import { LuLoader2 } from "react-icons/lu";

const { Option } = Select;

const Page = () => {
  const [formData, setFormData] = useState({
    staffId: "",
    email: "",
    name: "",
    role: "",
    password: "",
  });

  const router = useRouter();

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/user", formData);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "User already exists.",
            description: "Please use a different email or staff ID.",
            variant: "destructive",
          });
        } else if (err.response?.status === 422) {
          toast({
            title: "Invalid input.",
            description: "Please check your inputs and try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "An error occurred.",
          description: "Could not create user.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      toast({
        title: "User created.",
        description: `Staff ${data} has been created.`,
      });
      router.refresh();
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Register new staff</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <Form layout="vertical">
          <Form.Item
            label="Staff ID"
            name="staffId"
            rules={[{ required: true, message: "Please input Staff ID!" }]}
          >
            <Input
              placeholder="Enter Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input Email!" }]}
          >
            <Input
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input Password!" }]}
          >
            <Input.Password
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select
              placeholder="Select user role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
            >
              <Option value="Incharge Officer">Incharge Officer</Option>
              <Option value="Police Officer">Police Officer</Option>
              <Option value="Detective">Detective</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={
                Object.values(formData).some((value) => value === "") ||
                isLoading
              }
              onClick={() => createUser()}
              htmlType="submit"
            >
              {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Page;
