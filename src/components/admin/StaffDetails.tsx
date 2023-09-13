"use client";

import { Button, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import axios from "axios";

const cols = [
  {
    title: "Staff ID",
    dataIndex: "staffId",
    key: "staffId",
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Station",
    dataIndex: "station",
    key: "station",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space direction="horizontal">
        <Button icon={<EditOutlined />}></Button>
        <Popconfirm
          title="Are you sure you want to delete this staff?"
          okText="Yes"
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];

interface StaffData {
  staffId: string;
  name: string;
  rank: string;
  email: string;
  station: string;
  role: string;
  gender: string;
  key: string;
}

const StaffDetails = () => {
  const [data, setData] = React.useState<StaffData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/users");
    // console.log(res.data)
    setIsLoading(false);
    setData(
      res.data.map((row) => ({
        staffId: row.staffId,
        name: row.name,
        rank: row.rank,
        email: row.email,
        station: row.station,
        role: row.role,
        gender: row.gender,
        key: row.staffId,
      }))
    );
  };
  return (
    <div className="max-w-full">
      <div>
        <Table
          size="small"
          loading={isLoading}
          columns={cols}
          dataSource={data}
          pagination={{
            defaultPageSize: 15,
            showSizeChanger: true,
            pageSizeOptions: ["15", "20", "50", "100"],
          }}
          rowKey={(record) => record.key}
        />
      </div>
    </div>
  );
};

export default StaffDetails;
