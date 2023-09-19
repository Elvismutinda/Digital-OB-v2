"use client";

import * as React from "react";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button, Form, Input, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface StaffData {
  id: string;
  staffId: string;
  name: string;
  rank: string;
  email: string;
  station: string;
  role: string;
  gender: string;
  key: string;
}

const EditableCell: React.FC<{
  editing: boolean;
  dataIndex: string;
  inputType: "text" | "number";
  record: StaffData;
  children: React.ReactNode;
}> = ({ editing, dataIndex, inputType, record, children }) => {
  const inputNode = inputType === "text" && (
    <Input disabled={dataIndex === "staffId" || dataIndex === "station"} />
  );

  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          className="m-0"
          initialValue={record[dataIndex]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StaffDetails: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState<StaffData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editingKey, setEditingKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/users");
    // console.log(res.data)
    setIsLoading(false);
    setData(
      res.data.map((row: StaffData) => ({
        staffId: row.staffId,
        name: row.name,
        rank: row.rank,
        email: row.email,
        station: row.station,
        role: row.role,
        gender: row.gender,
        key: row.id,
      }))
    );
  };

  const isEditing = (record: StaffData) => record.key === editingKey;

  const edit = (record: StaffData) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as StaffData;

      const res = await axios.patch(`/api/users/${key}`, row);

      if (res.status === 200) {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          newData[index] = { ...newData[index], ...row };
          setData(newData);
          setEditingKey("");
        }

        toast({
          title: "Success",
          description: "Staff updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Try again later.",
          variant: "destructive",
        });
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
      key: "staffId",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
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
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (record: StaffData) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <Space>
                <Popconfirm
                  title="Sure to save?"
                  onConfirm={() => save(record.key)}
                  okText="Yes"
                >
                  <Button>Save</Button>
                </Popconfirm>
                <Button onClick={cancel}>Cancel</Button>
              </Space>
            ) : (
              <Space>
                <Button onClick={() => edit(record)}>
                  <EditOutlined />
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this staff?"
                  okText="Yes"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <Button icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: StaffData) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  async function handleDelete(userId: string) {
    const res = await axios.delete(`/api/users/${userId}`);

    if (res.status === 404) {
      toast({
        title: "Error",
        description: "Staff not found",
        variant: "destructive",
      });
    }

    if (res.status === 200) {
      toast({
        title: "Success",
        description: "Staff deleted successfully",
      });

      getData();
    }

    if (res.status === 500) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-full">
      <div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            size="small"
            loading={isLoading}
            columns={mergedColumns}
            dataSource={data}
            pagination={{
              onChange: cancel,
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

export default StaffDetails;
