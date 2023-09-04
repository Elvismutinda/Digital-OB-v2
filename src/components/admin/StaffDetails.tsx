"use client";

import { Space, Table } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

type Props = {};

const StaffDetails = (props: Props) => {
  let columns = [
    { label: "Staff ID", value: "staffId" },
    { label: "Name", value: "name" },
    { label: "Rank", value: "rank" },
    { label: "Station", value: "station" },
    { label: "Status", value: "status" },
    { label: "Gender", value: "gender" },
    {
      label: "Action",
      value: "action",
      render: () => (
        <Space size="middle">
          <a>
            <UserOutlined />
          </a>
          <a>
            <UserOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const cols = columns.map((col) => {
    return {
      title: col.label,
      dataIndex: col.value,
      key: col.value,
    };
  });

  let data = [
    {
      staffId: "1",
      name: "test",
      rank: "testRank",
      station: "Teststation station",
      status: "active",
      gender: "male",
      action: (
        <Space size="middle">
          <a>
            <UserOutlined />
          </a>
          <a>
            <UserOutlined />
          </a>
        </Space>
      ),
    },
    {
      staffId: "1",
      name: "test",
      rank: "testRank",
      station: "Teststation station",
      status: "active",
      gender: "male",
      action: (
        <Space size="middle">
          <a>
            <UserOutlined />
          </a>
          <a>
            <UserOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const rows = data.map((row) => {
    return {
      staffId: row.staffId,
      name: row.name,
      rank: row.rank,
      station: row.station,
      status: row.status,
      gender: row.gender,
    };
  });
  return (
    <div className="max-w-full">
      <div className="">
        <Table
          size="small"
          columns={cols}
          dataSource={data}
          pagination={{
            defaultPageSize: 15,
            showSizeChanger: true,
            pageSizeOptions: ["15", "20", "50", "100"],
          }}
        />
      </div>
    </div>
  );
};

export default StaffDetails;
