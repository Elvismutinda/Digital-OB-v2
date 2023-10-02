"use client";

import * as React from "react";

import axios from "axios";
import { format } from "date-fns";
import { Button, Form, Table } from "antd";

interface ComplainantData {
  id: string;
  case: string;
  name: string;
  description: string;
  national_id: string;
  age: number;
  contact: string;
  gender: string;
  date_added: string;
  key: string;
}

const SuspectsDetails = () => {
  const [data, setData] = React.useState<ComplainantData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/station/suspects");

    setIsLoading(false);
    setData(
      res.data.map((row: ComplainantData) => ({
        case: row.case,
        name: row.name,
        description: row.description,
        national_id: row.national_id,
        age: row.age,
        contact: row.contact,
        gender: row.gender,
        date_added: row.date_added,
        key: row.id,
      }))
    );
  };

  const columns = [
    {
      title: "OB Number",
      dataIndex: "case",
      key: "case",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "National ID",
      dataIndex: "national_id",
      key: "national_id",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (contact: string) => `+254 ${contact}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Added",
      dataIndex: "date_added",
      key: "date_added",
      render: (date) => format(new Date(date), "dd/MM/yyyy"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record: ComplainantData) => {
        return <Button>View description</Button>;
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
              // onChange: cancel,
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

export default SuspectsDetails;
