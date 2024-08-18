import { Row, Space, Table, TableProps } from "antd";
import "react-responsive-pagination/themes/classic.css";
import { useGetAllProductsQuery } from "../../api/productApi";
import { IProduct } from "../../models";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;

  const { data } = useGetAllProductsQuery();

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

  return <Table columns={columns} dataSource={data?.records} />;
};

export default DataTable;
