import { useEffect, useMemo, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import { transactionApi } from "../../api";
import { Table } from "../../components";
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

  const columns = useMemo<ColumnDef<ITransaction, any>[]>(
    () => [
      {
        accessorFn: (row) => row.provider,
        id: "provider",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.amount,
        id: "amount",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.orderInfo,
        id: "orderInfo",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.payDate,
        id: "payDate",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.succeed,
        id: "succeed",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.message,
        id: "message",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.transactionNo,
        id: "transactionNo",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.refNo,
        id: "refNo",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.accountId,
        id: "accountId",
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
