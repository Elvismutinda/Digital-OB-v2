"use client";

import * as React from "react";

import axios from "axios";
import { Form, Table } from "antd";
import { format } from "date-fns";

interface CaseData {
  id: string;
  ob_number: string;
  crime: string;
  complainant: string;
  police: string;
  detective: string;
  status: string;
  statement: string;
  dateAdded: string;
  dateClosed: string;
  key: string;
}

const CasesDetails = () => {
  const [data, setData] = React.useState<CaseData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/station/cases");

    setIsLoading(false);
    setData(
      res.data.map((row: CaseData) => ({
        ob_number: row.ob_number,
        crime: row.crime,
        complainant: row.complainant,
        police: row.police,
        detective: row.detective,
        status: row.status,
        statement: row.statement,
        dateAdded: row.dateAdded,
        dateClosed: row.dateClosed,
        key: row.id,
      }))
    );
  };

  const columns = [
    {
      title: "OB Number",
      dataIndex: "ob_number",
      key: "ob_number",
    },
    {
      title: "Crime",
      dataIndex: "crime",
      key: "crime",
    },
    {
      title: "Complainant name",
      dataIndex: "complainant",
      key: "complainant",
    },
    {
      title: "Reported by",
      dataIndex: "police",
      key: "police",
    },
    {
      title: "Investigated by",
      dataIndex: "detective",
      key: "detective",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Statement",
      dataIndex: "statement",
      key: "statement",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      render: (date) => format(new Date(date), "dd/MM/yyyy"),
    },
    {
      title: "Date Closed",
      dataIndex: "dateClosed",
      key: "dateClosed",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record: CaseData) => {
    //     return (
    //       <Space size="middle">
    //         <a>Edit</a>
    //         <a>Delete</a>
    //       </Space>
    //     );
    //   },
    // },
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

export default CasesDetails;
