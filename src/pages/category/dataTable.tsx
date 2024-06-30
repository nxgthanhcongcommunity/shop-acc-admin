import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { categoryApi, masterDataApi } from "../../api";
import { ActionButton, CdlImage, Table } from "../../components";
import { ICategory } from "../../models";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;
  const [records, setRecords] = React.useState<ICategory[]>(() => []);
  const [banners, setBanners] = useState<any>([]);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await categoryApi.GetCategories({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, [reloadGridToggle]);

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
        header: () => "Hình ảnh",
        accessorFn: (row) => row.mainFileCLDId,
        id: "mainFileCLDId",
        cell: (info) => <CdlImage w={16 * 4} h={16 * 4} id={info.getValue()} />,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: () => "Tên loại",
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        filterable: false,
      },
      {
        header: () => "Mã",
        accessorFn: (row) => row.code,
        id: "code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => "Banner",
        accessorFn: (row) => row.bannerCode,
        id: "bannerCode",
        cell: (info) => {
          const value = info.getValue();
          const text = banners.find((r: any) => r.code === value)?.name;
          return text;
        },
      },
      {
        header: () => "Thao tác",
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
    [banners]
  );

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
