import { useEffect, useMemo, useState } from "react";

import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";

import { ColumnDef } from "@tanstack/react-table";
import "react-responsive-pagination/themes/classic.css";
import productApi from "../../api/productApi";
import { ActionButton, CdlImage, Table } from "../../components";
import { IProduct } from "../../models";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;

  const [records, setRecords] = useState<IProduct[]>(() => []);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await productApi.GetProducts({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, [reloadGridToggle]);

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
            <div className="inline-flex" role="group">
              <ActionButton
                side={"left"}
                onClick={() => setSelectedAction({ action: "update", record })}
              >
                Cập nhật
              </ActionButton>
              <ActionButton
                side={"right"}
                onClick={() => setSelectedAction({ action: "delete", record })}
              >
                Xóa
              </ActionButton>
            </div>
          );
        },
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-8 overflow-y-scroll">
      <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 mb-8">Danh sách</h5>
        <Table
          columns={columns}
          records={records}
          triggerReloadGridToggle={() => {
            setReloadGridToggle((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default DataTable;
