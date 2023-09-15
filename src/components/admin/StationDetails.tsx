"use client";

import { Button, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface StationData {
  id: string;
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
      res.data.map((row: StationData) => ({
        name: row.name,
        county: row.county,
        sub_county: row.sub_county,
        contact: row.contact,
        key: row.id,
      }))
    );
  };

  async function handleDelete(stationId: string) {
    const res = await axios.delete(`/api/stations/${stationId}`);

    if (res.status === 404) {
      toast({
        title: "Error",
        description: "Station not found",
        variant: "destructive",
      });
    }

    if (res.status === 200) {
      toast({
        title: "Success",
        description: "Station deleted successfully",
      });

      getData();
    }

    if (res.status === 500) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-full">
      <div>
        <Table
          size="small"
          loading={isLoading}
          columns={[
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
                    {/* <Link href={`/admin/stations/${record.key}`}> */}
                      <Button icon={<EditOutlined />}></Button>
                    {/* </Link> */}
                  <Popconfirm
                    title="Are you sure you want to delete this station?"
                    okText="Yes"
                    onConfirm={() => handleDelete(record.key)}
                  >
                    <Button icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
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
