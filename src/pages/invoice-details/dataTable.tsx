import { useEffect, useMemo, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { invoiceApi } from "../../api";
import { Search, Table } from "../../components";
import { useDebounce } from "../../hooks";
import { IInvoiceDetail } from "../../models";
import { ColumnDef } from "@tanstack/react-table";

const DataTable = () => {
  const [records, setRecords] = useState<IInvoiceDetail[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await invoiceApi.GetInvoiceDetails({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, []);

  const columns = useMemo<ColumnDef<IInvoiceDetail, any>[]>(
    () => [
      {
        accessorFn: (row) => row.invoice.code,
        id: "invoice.code",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.product.name,
        id: "product.name",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.quantity,
        id: "quantity",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.unitPrice,
        id: "unitPrice",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.totalPrice,
        id: "totalPrice",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.totalPrice,
        id: "totalPrice",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.invoice.createdAt,
        id: "invoice.createdAt",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return <Table columns={columns} records={records} setRecords={setRecords} />;
};

export default DataTable;
