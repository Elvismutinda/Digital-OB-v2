"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Select,
  Table,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LuLoader2 } from "react-icons/lu";

const { Content } = Layout;

const page = async () => {
  const { Option } = Select;

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

  const [openModal, setOpenModal] = useState(false);

  return (
    <Content>
      <div className="p-6 min-h-[360px]">
        <div>
          <div className="flex justify-between mb-2">
            <Breadcrumb
              items={[{ title: <a href="/">Home</a> }, { title: "Users" }]}
            />
            <Button icon={<UserOutlined />} onClick={() => setOpenModal(true)}>
              Add Staff
            </Button>
            <Modal
              title="Add User"
              open={openModal}
              onOk={() => createUser(setOpenModal(false))}
              onCancel={() => setOpenModal(false)}
            >
              <Form layout="vertical">
                <Form.Item
                  label="Staff ID"
                  name="staffId"
                  rules={[
                    { required: true, message: "Please input Staff ID!" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please input Password!" },
                  ]}
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
                    onChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <Option value="Incharge Officer">Incharge Officer</Option>
                    <Option value="Police Officer">Police Officer</Option>
                    <Option value="Detective">Detective</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <Table
          size="small"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </div>
    </Content>
  );
};

export default page;
