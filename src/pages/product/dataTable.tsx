import { useEffect, useMemo, useState } from "react";

import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import productApi from "../../api/productApi";
import { CdlImage, Table } from "../../components";
import { IProduct } from "../../models";

const DataTable = () => {
  const [records, setRecords] = useState<IProduct[]>(() => []);

  useEffect(() => {
    (async () => {
      const response = await productApi.GetProducts({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, []);

  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        filterable: false,
      },
      {
        accessorFn: (row) => row.code,
        id: "code",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.quantity.currentQuantity,
        id: "currentQuantity",
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorFn: (row) => row.mainFileCLDId,
        id: "mainFileCLDId",
        cell: (info) => <CdlImage w={24 * 4} h={24 * 4} id={info.getValue()} />,
        header: () => <span>Hình ảnh</span>,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.childsFilesCLDId,
        id: "childsFilesCLDId",
        cell: (info) => (
          <div className="flex items-center gap-x-1">
            {JSON.parse(info.getValue()).map((id: string) => (
              <CdlImage w={24 * 4} h={24 * 4} id={id} />
            ))}
          </div>
        ),
        header: () => <span>Hình ảnh</span>,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.server,
        id: "server",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.loginType,
        id: "loginType",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.operatingSystem,
        id: "operatingSystem",
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorFn: (row) => row.gemChono,
        id: "gemChono",
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorFn: (row) => row.descriptions,
        id: "descriptions",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.category.name,
        id: "categoryName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => "Action",
        id: "action",
        cell: (info) => {
          const record = info.cell.row.original;
          return (
            <div className="flex justify-start">
              <UpdateModal product={record} />
              <DeleteModal product={record} />
            </div>
          );
        },
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return <Table columns={columns} records={records} setRecords={setRecords} />;
};

export default DataTable;
