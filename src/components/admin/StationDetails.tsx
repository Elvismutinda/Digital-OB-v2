"use client";

import * as React from "react";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button, Form, Input, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface StationData {
  id: string;
  name: string;
  county: string;
  sub_county: string;
  contact: string;
  key: string;
}

const EditableCell: React.FC<{
  editing: boolean;
  dataIndex: string;
  inputType: "text" | "number";
  record: StationData;
  children: React.ReactNode;
}> = ({ editing, dataIndex, inputType, record, children }) => {
  const inputNode = inputType === "text" && (
    <Input disabled={dataIndex === "county" || dataIndex === "sub_county"} />
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

const StationDetails: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState<StationData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editingKey, setEditingKey] = React.useState<string | null>(null);

  React.useEffect(() => {
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

  const isEditing = (record: StationData) => record.key === editingKey;

  const edit = (record: StationData) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as StationData;

      const res = await axios.patch(`/api/stations/${key}`, row);

      if (res.status === 200) {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          newData[index] = row;
          setData(newData);
          setEditingKey("");
        }

        toast({
          title: "Success",
          description: "Station updated successfully",
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
      title: "Station Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "County",
      dataIndex: "county",
      key: "county",
      editable: true,
    },
    {
      title: "Sub-County",
      dataIndex: "sub_county",
      key: "sub_county",
      editable: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (contact: string) => `+254 ${contact}`,
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: StationData) => {
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
                  title="Are you sure you want to delete this station?"
                  okText="Yes"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <Button>
                    <DeleteOutlined />
                  </Button>
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
      onCell: (record: StationData) => ({
        record,
        // inputType: col.dataIndex === "contact" ? "number" : "text",
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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

export default StationDetails;
