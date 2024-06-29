import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { categoryApi, masterDataApi } from "../../api";
import { CdlImage, Table } from "../../components";
import { ICategory } from "../../models";
import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";

const DataTable = () => {
  const [records, setRecords] = React.useState<ICategory[]>(() => []);
  const [banners, setBanners] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response = await categoryApi.GetCategories({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await masterDataApi.getByKey({
        key: "home-page",
      });

      if (!response.succeed) return;

      setBanners(response.data.banners);
    })();
  }, []);

  const columns = React.useMemo<ColumnDef<ICategory, any>[]>(
    () => [
      {
        accessorFn: (row) => row.mainFileCLDId,
        id: "mainFileCLDId",
        cell: (info) => <CdlImage w={16 * 4} h={16 * 4} id={info.getValue()} />,
        header: () => <span>Hình ảnh</span>,
        enableColumnFilter: false,
        enableSorting: false,
      },
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
        accessorFn: (row) => row.bannerCode,
        id: "bannerCode",
        cell: (info) => {
          const value = info.getValue();
          const text = banners.find((r: any) => r.code === value)?.name;
          return text;
        },
      },
      {
        accessorFn: (row) => "Action",
        id: "action",
        cell: (info) => {
          const record = info.cell.row.original;
          return (
            <div className="flex justify-start">
              <UpdateModal category={record} />
              <DeleteModal category={record} />
            </div>
          );
        },
        enableColumnFilter: false,
        enableSorting: false,
      },
      // {
      //   accessorFn: (row) => row.bannerCode,
      //   id: "Banner",
      //   cell: (info) => info.getValue(),
      // },

      // {
      //   accessorKey: "age",
      //   header: () => "Age",
      //   meta: {
      //     filterVariant: "range",
      //   },
      // },
      // {
      //   accessorKey: "visits",
      //   header: () => <span>Visits</span>,
      //   meta: {
      //     filterVariant: "range",
      //   },
      // },
      // {
      //   accessorKey: "status",
      //   header: "Status",
      //   meta: {
      //     filterVariant: "select",
      //   },
      // },
      // {
      //   accessorKey: "progress",
      //   header: "Profile Progress",
      //   meta: {
      //     filterVariant: "range",
      //   },
      // },
    ],
    [banners]
  );

  return <Table columns={columns} records={records} setRecords={setRecords} />;
};

export default DataTable;
