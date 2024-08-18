import { Table, TableProps } from "antd";

import { useGetAllInvoicesQuery } from "../../api/invoiceApi";
import { IInvoice } from "../../models";

const DataTable = () => {
  const { data } = useGetAllInvoicesQuery();

  const columns: TableProps<IInvoice>["columns"] = [
    {
      title: "account.email",
      dataIndex: ["account", "email"],
      key: "account.email",
    },
    {
      title: "totalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];

  return <Table columns={columns} dataSource={data?.records} />;
};

export default DataTable;
