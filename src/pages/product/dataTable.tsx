import { Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import "react-responsive-pagination/themes/classic.css";
import { IProduct } from "../../models";
import productApi from "../../api/productApi";
import { ActionButton } from "../../components";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;

  const [records, setRecords] = useState<IProduct[]>([]);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      debugger;
      const response = await productApi.GetProducts({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, []);

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "currentQuantity",
      dataIndex: "currentQuantity",
      key: "currentQuantity",
    },
    {
      title: "mainFileCLDId",
      dataIndex: "mainFileCLDId",
      key: "mainFileCLDId",
    },
    {
      title: "childsFilesCLDId",
      dataIndex: "childsFilesCLDId",
      key: "childsFilesCLDId",
    },
    {
      title: "server",
      dataIndex: "server",
      key: "server",
    },
    {
      title: "loginType",
      dataIndex: "loginType",
      key: "loginType",
    },
    {
      title: "operatingSystem",
      dataIndex: "operatingSystem",
      key: "operatingSystem",
    },
    {
      title: "gemChono",
      dataIndex: "gemChono",
      key: "gemChono",
    },
    {
      title: "descriptions",
      dataIndex: "descriptions",
      key: "descriptions",
    },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => setSelectedAction({ action: "update", record })}>
            Cập nhật
          </a>
          <Space size="small" />
          <a onClick={() => setSelectedAction({ action: "delete", record })}>
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={records} />;
};

export default DataTable;
