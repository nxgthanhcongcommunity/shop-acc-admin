import { useEffect, useState } from "react";

import { Table, TableProps } from "antd";
import { invoiceApi } from "../../api";
import { IInvoice } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<IInvoice[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await invoiceApi.Get({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, []);

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

  return <Table columns={columns} dataSource={records} />;
};

export default DataTable;
