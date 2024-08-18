import { Table, TableProps } from "antd";
import "react-responsive-pagination/themes/classic.css";
import { useGetAllAccountsQuery } from "../../api/accountApi";
import { IAccount } from "../../models";

const DataTable = () => {
  const { isLoading, data } = useGetAllAccountsQuery();

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

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data?.records ?? []}
    />
  );
};

export default DataTable;
