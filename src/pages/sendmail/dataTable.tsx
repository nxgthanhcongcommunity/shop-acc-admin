import { useEffect, useState } from "react";

import { Table, TableProps } from "antd";
import "react-responsive-pagination/themes/classic.css";
import { sendmailApi } from "../../api";
import { ISendMail } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<ISendMail[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await sendmailApi.Get({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, []);

  const columns: TableProps<ISendMail>["columns"] = [
    {
      title: "from",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "to",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "attempTimes",
      dataIndex: "attempTimes",
      key: "attempTimes",
    },
    {
      title: "succeed",
      dataIndex: "succeed",
      key: "succeed",
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
