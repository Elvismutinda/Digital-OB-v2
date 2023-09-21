"use client";

import { useState, useReducer } from "react";

import axios from "axios";
import { ButtonProps, buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Form, Input, Select, Button, message, Modal, Radio } from "antd";
import { crimeData } from "@/config/crimes";
import { HiOutlinePlusSm } from "react-icons/hi";

const { Option } = Select;
const { TextArea } = Input;

const initialFormData = {
  currentPage: 1,
  complainantData: {
    name: "",
    contact: "",
    occupation: "",
    age: "",
    address: "",
    gender: "",
  },
  caseData: {
    ob_number: "",
    crime: "",
    statement: "",
  },
};

function formReducer(state, action) {
  switch (action.type) {
    case "updateComplainantData":
      return {
        ...state,
        complainantData: {
          ...state.complainantData,
          ...action.payload,
        },
      };
    case "updateCaseData":
      return {
        ...state,
        caseData: {
          ...state.caseData,
          ...action.payload,
        },
      };
    case "nextPage":
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case "previousPage":
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case "reset":
      return initialFormData;
    default:
      return state;
  }
}

const ComplainantDetailsPage = ({ formData, dispatch }) => {
  const handleNext = () => {
    if (
      formData.complainantData.name &&
      formData.complainantData.contact &&
      formData.complainantData.occupation &&
      formData.complainantData.age &&
      formData.complainantData.address &&
      formData.complainantData.gender
    ) {
      dispatch({ type: "nextPage" });
    } else {
      message.error("Please fill in all required fields before proceeding.");
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item
        label="Complainant name"
        name="name"
        rules={[{ required: true, message: "Please input complainant name" }]}
      >
        <Input
          name="name"
          autoComplete="off"
          value={formData.complainantData.name}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { name: e.target.value },
            })
          }
        />
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
          value={formData.complainantData.contact}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { contact: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Occupation"
        name="occupation"
        rules={[{ required: true, message: "Please input occupation" }]}
      >
        <Input
          name="occupation"
          autoComplete="off"
          value={formData.complainantData.Occupation}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { occupation: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: "Please input age" }]}
      >
        <Input
          name="age"
          type="number"
          autoComplete="off"
          value={formData.complainantData.age}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { age: parseInt(e.target.value, 10) },
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input address" }]}
      >
        <Input
          name="address"
          autoComplete="off"
          value={formData.complainantData.address}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { address: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Radio.Group
          value={formData.complainantData.gender}
          onChange={(e) =>
            dispatch({
              type: "updateComplainantData",
              payload: { gender: e.target.value },
            })
          }
        >
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" onClick={handleNext}>
        Next
      </Button>
    </Form>
  );
};

const CaseDetailsPage = ({ formData, dispatch, submitForm }) => {
  const handlePrevious = () => {
    dispatch({ type: "previousPage" });
  };

  const handleSubmit = () => {
    // console.log(formData.complainantData);
    // console.log(formData.caseData);
    axios
      .post("/api/complainants", formData.complainantData)
      .then((response) => {
        const complainantId = response.data;

        axios
          .post("/api/cases", {
            ...formData.caseData,
            complainantId: complainantId,
          })
          .then(() => {
            message.success("Complaint submitted successfully.");
            submitForm();
          });
      });
  };

  return (
    <Form layout="vertical">
      <Form.Item
        label="OB Number"
        name="ob_number"
        rules={[{ required: true, message: "OB Number is required!" }]}
      >
        <Input
          name="ob_number"
          autoComplete="off"
          value={formData.caseData.ob_number}
          onChange={(e) =>
            dispatch({
              type: "updateCaseData",
              payload: { ob_number: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Crime"
        name="crime"
        rules={[{ required: true, message: "Please select crime!" }]}
      >
        <Select
          placeholder="Select Crime"
          value={formData.caseData.crime}
          onChange={(value) =>
            dispatch({
              type: "updateCaseData",
              payload: { crime: value },
            })
          }
        >
          {crimeData.map((crime) => (
            <Option key={crime.id} value={crime.type}>
              {crime.type}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Statement"
        name="statement"
        rules={[{ required: true, message: "Please input statement" }]}
      >
        <TextArea
          name="statement"
          autoComplete="off"
          value={formData.caseData.statement}
          onChange={(e) =>
            dispatch({
              type: "updateCaseData",
              payload: { statement: e.target.value },
            })
          }
          autoSize
        />
      </Form.Item>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

interface ComplaintFormProps extends ButtonProps {}

const ComplaintForm = ({
  className,
  variant,
  ...props
}: ComplaintFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const submitForm = () => {
    dispatch({
      currentPage: 1,
      complainantData: {
        name: "",
        contact: "",
        occupation: "",
        age: "",
        address: "",
        gender: "",
      },
      caseData: {
        ob_number: "",
        crime: "",
        statement: "",
      },
    });

    dispatch({ type: "reset" });
    setOpenModal(false);
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
        New Complaint
      </button>
      <Modal
        title="Complaint Form"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          dispatch({ type: "reset" });
        }}
        footer={null}
      >
        {formData.currentPage === 1 ? (
          <ComplainantDetailsPage formData={formData} dispatch={dispatch} />
        ) : (
          <CaseDetailsPage
            formData={formData}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        )}
      </Modal>
    </>
  );
};

export default ComplaintForm;
