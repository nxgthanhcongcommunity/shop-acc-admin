import { useEffect, useState } from "react";

import { Table, TableProps } from "antd";
import { transactionApi } from "../../api";
import { ITransaction } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<ITransaction[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await transactionApi.Get({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, []);

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

  return <Table columns={columns} dataSource={records} />;
};

export default DataTable;
