"use client";

import * as React from "react";
import { ButtonProps, buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { DatePicker, Form, Input, Modal, Radio, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { HiOutlinePlusSm } from "react-icons/hi";

const { Option } = Select;
const { TextArea } = Input;

interface SuspectCreateButtonProps extends ButtonProps {}

const SuspectCreateButton = ({
  className,
  variant,
  ...props
}: SuspectCreateButtonProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [obNumbers, setObNumbers] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    if (openModal) {
      axios
        .get("/api/station/cases/caseName")
        .then((response) => {
          setObNumbers(response.data);
        })
        .catch((err) => {
          console.log("Error fetching ob numbers", err);
        });
    }
  }, [openModal]);

  const [formData, setFormData] = React.useState({
    obNumber: "",
    name: "",
    description: "",
    national_id: "",
    age: null as number | null,
    contact: "",
    gender: "",
  });

  const { mutate: createSuspect, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/station/suspects", formData);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          message.error("Suspect already exists for that case.");
        } else if (err.response?.status === 422) {
          message.error("Invalid inputs provided.");
        }
      } else {
        message.error("An error occurred. Try again later.");
      }
    },
    onSuccess: (data) => {
      message.success("Suspect created successfully.");

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

  return (
    <>
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
        Add Suspect
      </button>
      <Modal
        title="New Suspect"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => createSuspect()}
        okText="Submit"
      >
        <Form layout="vertical">
          <Form.Item
            label="Case involved in"
            name="caseId"
            rules={[
              {
                required: true,
                message: "Please select the case to be linked with the suspect",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select O.B Number"
              value={formData.obNumber}
              onChange={(value) =>
                setFormData({ ...formData, obNumber: value })
              }
            >
              {obNumbers.map((obNumber) => (
                <Option key={obNumber} value={obNumber}>
                  {obNumber}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Suspect name"
            name="name"
            rules={[{ required: true, message: "Please input suspect's name" }]}
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
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input suspect description" },
            ]}
          >
            <TextArea
              name="description"
              autoComplete="off"
              size="large"
              value={formData.name}
              onChange={handleInputChange}
              autoSize
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="National ID"
            name="national_id"
            rules={[
              { required: true, message: "Please input suspect's national ID" },
            ]}
          >
            <Input
              name="national_id"
              autoComplete="off"
              size="large"
              value={formData.national_id}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, type: "number", message: "Please input age" },
            ]}
          >
            <Input
              type="number"
              name="age"
              autoComplete="off"
              size="large"
              value={formData.age !== null ? String(formData.age) : ""}
              onChange={(e) => {
                const ageValue = parseInt(e.target.value, 10);
                setFormData({
                  ...formData,
                  age: isNaN(ageValue) ? null : ageValue,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: "Please input suspect's contact" },
            ]}
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
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input gender" }]}
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
        </Form>
      </Modal>
    </>
  );
};

export default SuspectCreateButton;
