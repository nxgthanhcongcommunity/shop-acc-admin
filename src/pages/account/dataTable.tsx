import { useEffect, useMemo, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import { accountApi } from "../../api";
import { Table } from "../../components";
import { IAccount } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<IAccount[]>(() => []);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await accountApi.GetAccounts({});
      if (!response.succeed) return;

      setRecords(response.data.records);
    })();
  }, [reloadGridToggle]);

  const columns = useMemo<ColumnDef<IAccount, any>[]>(
    () => [
      {
        accessorFn: (row) => row.email,
        id: "email",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.balance.amount,
        id: "balance.amount",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.photo,
        id: "photo",
        cell: (info) => <img src={info.getValue()} alt="" className="w-16" />,
      },
      {
        accessorFn: (row) => row.familyName,
        id: "familyName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.givenName,
        id: "givenName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.isVerifyEmail,
        id: "isVerifyEmail",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.providerName,
        id: "providerName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.role,
        id: "role",
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
