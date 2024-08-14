import { useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import "react-responsive-pagination/themes/classic.css";
import { accountApi } from "../../api";
import { IAccount } from "../../models";
import { useGetAllAccountsQuery } from "../../api/appApi";

const DataTable = () => {
  const [records, setRecords] = useState<IAccount[]>(() => []);

  // useEffect(() => {
  //   (async () => {
  //     const response = await accountApi.GetAccounts({});
  //     if (!response.succeed) return;

  //     setRecords(response.data.records);
  //   })();
  // }, []);

  const { data } = useGetAllAccountsQuery();

  console.log("data", data);

  const columns: TableProps<IAccount>["columns"] = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "balance.amount",
      key: "Amount",
    },
    {
      title: "photo",
      dataIndex: "photo",
      key: "photo",
      render: (text: any) => {
        return <img src={text} alt="" className="w-16" />;
      },
    },
    {
      title: "familyName",
      dataIndex: "familyName",
      key: "familyName",
    },
    {
      title: "givenName",
      dataIndex: "givenName",
      key: "givenName",
    },
    {
      title: "isVerifyEmail",
      dataIndex: "isVerifyEmail",
      key: "isVerifyEmail",
    },
    {
      title: "providerName",
      dataIndex: "providerName",
      key: "providerName",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return <Table columns={columns} dataSource={records} />;
};

export default DataTable;
