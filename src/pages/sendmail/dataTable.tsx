import { useEffect, useMemo, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import { sendmailApi } from "../../api";
import { Table } from "../../components";
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

  const columns = useMemo<ColumnDef<ISendMail, any>[]>(
    () => [
      {
        accessorFn: (row) => row.from,
        id: "from",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.to,
        id: "to",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.subject,
        id: "subject",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.text,
        id: "text",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.attempTimes,
        id: "attempTimes",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.succeed,
        id: "succeed",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.createdAt,
        id: "createdAt",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.updatedAt,
        id: "updatedAt",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return <Table columns={columns} records={records} setRecords={setRecords} />;
};

export default DataTable;
