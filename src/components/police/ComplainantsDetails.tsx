"use client";

import * as React from "react";

import axios from "axios";
import { Button, Form, Table } from "antd";

interface ComplainantData {
  id: string;
  name: string;
  contact: string;
  occupation: string;
  age: number;
  address: string;
  gender: string;
  key: string;
}

const ComplainantsDetails = () => {
  const [data, setData] = React.useState<ComplainantData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/station/complainants");

    setIsLoading(false);
    setData(
      res.data.map((row: ComplainantData) => ({
        name: row.name,
        contact: row.contact,
        occupation: row.occupation,
        age: row.age,
        address: row.address,
        gender: row.gender,
        key: row.id,
      }))
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record: ComplainantData) => {
        return <Button>View Case Details</Button>;
      },
    },
  ];
  return (
    <div className="max-w-full">
      <div>
        <Form>
          <Table
            size="small"
            loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["15", "20", "50", "100"],
            }}
            rowKey={(record) => record.key}
          />
        </Form>
      </div>
    </div>
  );
};

export default ComplainantsDetails;
