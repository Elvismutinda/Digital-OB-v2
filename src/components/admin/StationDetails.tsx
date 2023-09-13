"use client";

import { Button, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import axios from "axios";

const cols = [
  {
    title: "Station Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "County",
    dataIndex: "county",
    key: "county",
  },
  {
    title: "Sub-County",
    dataIndex: "sub_county",
    key: "sub_county",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    render: (contact) => `+254 ${contact}`,
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space direction="horizontal">
        <Button icon={<EditOutlined />}></Button>
        <Popconfirm
          title="Are you sure you want to delete this station?"
          okText="Yes"
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];

interface StationData {
  name: string;
  county: string;
  sub_county: string;
  contact: string;
  key: string;
}

const StationDetails = () => {
  const [data, setData] = React.useState<StationData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/stations");
    // console.log(res.data)
    setIsLoading(false);
    setData(
      res.data.map((row) => ({
        name: row.name,
        county: row.county,
        sub_county: row.sub_county,
        contact: row.contact,
        key: row.name,
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

export default StationDetails;
