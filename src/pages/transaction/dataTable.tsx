import { Table, TableProps } from "antd";
import { useGetAllTransactionsQuery } from "../../api/transactionApi";
import { ITransaction } from "../../models";

const DataTable = () => {
  const { data } = useGetAllTransactionsQuery();

  const columns: TableProps<ITransaction>["columns"] = [
    {
      title: "provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "orderInfo",
      dataIndex: "orderInfo",
      key: "orderInfo",
    },
    {
      title: "payDate",
      dataIndex: "payDate",
      key: "payDate",
    },
    {
      title: "succeed",
      dataIndex: "succeed",
      key: "succeed",
    },
    {
      title: "message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "transactionNo",
      dataIndex: "transactionNo",
      key: "transactionNo",
    },
    {
      title: "refNo",
      dataIndex: "refNo",
      key: "refNo",
    },
    {
      title: "accountId",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  return <Table columns={columns} dataSource={data?.records} />;
};

export default DataTable;
