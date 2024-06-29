import { useEffect, useMemo, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { invoiceApi } from "../../api";
import { Search, Table } from "../../components";
import { useDebounce } from "../../hooks";
import { IInvoice } from "../../models";
import { ColumnDef } from "@tanstack/react-table";

const DataTable = () => {
  const [records, setRecords] = useState<IInvoice[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await invoiceApi.Get({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, []);

  const columns = useMemo<ColumnDef<IInvoice, any>[]>(
    () => [
      {
        accessorFn: (row) => row.account.email,
        id: "account.email",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.totalAmount,
        id: "totalAmount",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return <Table columns={columns} records={records} setRecords={setRecords} />;
};

export default DataTable;
