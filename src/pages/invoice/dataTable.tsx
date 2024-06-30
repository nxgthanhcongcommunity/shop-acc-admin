import { useEffect, useMemo, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import { invoiceApi } from "../../api";
import { Table } from "../../components";
import { IInvoice } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<IInvoice[]>(() => []);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await invoiceApi.Get({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, [reloadGridToggle]);

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

  // return <Table columns={columns} records={records} setRecords={setRecords} />;
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-8">
      <form className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 mb-8">Danh sách</h5>
        <Table
          columns={columns}
          records={records}
          triggerReloadGridToggle={() => {
            setReloadGridToggle((prev) => !prev);
          }}
        />
      </form>
    </div>
  );
};

export default DataTable;
