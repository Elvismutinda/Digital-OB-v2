"use client";

import * as React from "react";
import { ButtonProps, buttonVariants } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Form, Input, Modal, Radio, Select, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ranksData } from "@/config/rank";

const { Option } = Select;

interface StaffCreateButtonProps extends ButtonProps {}

const StaffCreateButton = ({
  className,
  variant,
  ...props
}: StaffCreateButtonProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [stationNames, setStationNames] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    staffId: "",
    rank: "",
    role: "",
    gender: "",
    station: "",
  });

  React.useEffect(() => {
    if (openModal) {
      axios
        .get("/api/station")
        .then((response) => {
          setStationNames(response.data);
        })
        .catch((err) => {
          console.log("Error fetching station names", err);
        });
    }
  }, [openModal]);

  const router = useRouter();

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/users", formData);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          message.error("User already exists.");
        } else if (err.response?.status === 422) {
          message.error("Invalid inputs provided.");
        }
      } else {
        message.error("An error occurred. Try again later.");
      }
    },
    onSuccess: (data) => {
      message.success("User created successfully.");

      setOpenModal(false);

      router.refresh();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      staffId: "",
      rank: "",
      role: "",
      gender: "",
      station: "",
    });
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
          resetForm();
        }}
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        {...props}
      >
        <HiOutlinePlusSm className="mr-2 h-4 w-4" />
        Register Staff
      </button>
      <Modal
        title="Register Staff"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          resetForm();
        }}
        onOk={() => createUser()}
        okText="Register Staff"
        afterClose={() => resetForm()}
      >
        <Form layout="vertical">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input
              name="name"
              autoComplete="off"
              size="large"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input Email!" }]}
          >
            <Input
              name="email"
              autoComplete="off"
              size="large"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input Password!" }]}
          >
            <Input.Password
              name="password"
              size="large"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Staff ID"
            name="staffId"
            rules={[{ required: true, message: "Please input Staff ID!" }]}
          >
            <Input
              name="staffId"
              autoComplete="off"
              size="large"
              value={formData.staffId}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Rank"
            name="rank"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select
              size="large"
              placeholder="Select user rank"
              value={formData.rank}
              onChange={(value) => setFormData({ ...formData, rank: value })}
            >
              {ranksData.map((rank) => (
                <Option key={rank.id} value={rank.name}>
                  {rank.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select
              size="large"
              placeholder="Select user role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
            >
              <Option value="Admin">Admin</Option>
              <Option value="Incharge">Incharge Officer</Option>
              <Option value="Police">Police Officer</Option>
              <Option value="Detective">Detective</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Radio.Group
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Station"
            name="station"
            rules={[{ required: true, message: "Please select station!" }]}
          >
            <Select
              size="large"
              placeholder="Select user station"
              value={formData.station}
              onChange={(value) => setFormData({ ...formData, station: value })}
            >
              {stationNames.map((stationName) => (
                <Option key={stationName} value={stationName}>
                  {stationName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StaffCreateButton;
