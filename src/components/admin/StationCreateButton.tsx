"use client";

import * as React from "react";
import { ButtonProps, buttonVariants } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Form, Input, Modal, Select, message } from "antd";
import { countiesData } from "@/config/counties";

const { Option } = Select;

interface StationCreateButtonProps extends ButtonProps {}

const StationCreateButton = ({
  className,
  variant,
  ...props
}: StationCreateButtonProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState({
    name: "",
    county: "",
    sub_county: "",
    contact: "",
  });

  const router = useRouter();

  const { mutate: createStation, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/stations", formData);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          message.error("Station already exists.");
        } else if (err.response?.status === 422) {
          message.error("Invalid inputs provided.");
        }
      } else {
        message.error("An error occurred. Try again later.");
      }
    },
    onSuccess: (data) => {
      message.success("Station created successfully.");

      setOpenModal(false);

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

  const handleCountyChange = (value) => {
    setFormData({ ...formData, county: value, sub_county: "" });
  };

  const selectedCounty = countiesData.find(
    (county) => county.name === formData.county
  );

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
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
        Register Station
      </button>
      <Modal
        title="Register Station"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => createStation()}
        okText="Register Station"
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input station name" }]}
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
            label="County"
            name="county"
            rules={[{ required: true, message: "Please input County" }]}
          >
            <Select
              size="large"
              placeholder="Select County"
              value={formData.county}
              onChange={(value) => setFormData({ ...formData, county: value })}
            >
              {countiesData.map((county) => (
                <Option key={county.code} value={county.name}>
                  {county.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Sub-County"
            name="sub_county"
            rules={[{ required: true, message: "Please input Sub-County" }]}
          >
            <Select
              size="large"
              placeholder="Select Sub-County"
              value={formData.sub_county}
              onChange={(value) =>
                setFormData({ ...formData, sub_county: value })
              }
              disabled={!formData.county}
            >
              {selectedCounty &&
                selectedCounty.sub_counties.map((sub_county) => (
                  <Option key={sub_county} value={sub_county}>
                    {sub_county}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "Please input contact" }]}
          >
            <Input
              name="contact"
              addonBefore="+254"
              autoComplete="off"
              size="large"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StationCreateButton;
