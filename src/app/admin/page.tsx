"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Space,
  Table,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const adminItems: MenuItem[] = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Cases", "2", <DesktopOutlined />),
  getItem("Staff", "3", <UserOutlined />),
  getItem("Stations", "4", <TeamOutlined />),
  getItem("Reports", "5", <FileOutlined />),
  getItem("Audit Logs", "6", <FileOutlined />),
  getItem("Settings", "7", <FileOutlined />),
  getItem("Logout", "8", <FileOutlined />),
];

const page = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      name: "elvis",
      rank: "inspector",
      station: "Langata station",
      status: "active",
      gender: "male",
      action: (
        <Space size="middle">
          <a>Hi</a>
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
      name: "elvis",
      rank: "inspector",
      station: "Langata station",
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
    <Layout hasSider>
      <Sider
        trigger={null}
        breakpoint="xs"
        collapsedWidth="100"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        className="fixed top-0 left-0 bottom-0 h-screen overflow-auto"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="w-[200px] py-0 px-6 flex justify-start items-center h-16 bg-white text-sm border-b">
          <a href="/" className="inline-block no-underline">
            <Space
              direction="horizontal"
              align="center"
              className="flex items-center text-inherit gap-8"
            >
              <Image src="../cs-haven.svg" width={24} height={24} alt="logo" />
              <Title
                className="mb-0 font-semibold"
                style={{ fontSize: "inherit" }}
              >
                Digital O.B
              </Title>
            </Space>
          </a>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]} items={adminItems} />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-base w-16 h-16"
          />
        </Header>
        <Content>
          <div className="p-6 min-h-[360px]">
            <div>
              <div className="flex justify-between mb-2">
                <Breadcrumb
                  items={[{ title: <a href="/">Home</a> }, { title: "Dashboard" }]}
                />
                <Button icon={<UserOutlined />}>Add Staff</Button>
              </div>
            </div>
            <Table
              className="items-center justify-center"
              size="small"
              columns={cols}
              dataSource={data}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default page;
