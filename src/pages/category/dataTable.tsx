import { useEffect, useState } from "react";
import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import categoryApi from "../../api/categoryApi";
import { CdlImage, Search } from "../../components";
import { useDebounce } from "../../hooks";
import { ICategory } from "../../models";

const DataTable = () => {
  const [states, updateStates] = useState({
    categories: [],
    totalPage: 0,
    queryConfig: {
      page: 1,
      limit: 5,
      name: "",
    },
  });

  const debouncedName = useDebounce(states.queryConfig.name, 1000);

  useEffect(() => {
    (async () => {
      const { succeed, data } = await categoryApi.GetCategories(states.queryConfig);
      if (!succeed) return;

      const { total, data: categories } = data;

      updateStates({
        ...states,
        categories,
        totalPage: Math.ceil(total / states.queryConfig.limit),
      });

    })();
  }, [states.queryConfig.page, debouncedName]);

  const handleSearchChange = (currentValue: string) => {
    updateStates({
      ...states,
      queryConfig: {
        ...states.queryConfig,
        page: 1,
        name: currentValue,
      },
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <Search onTextChange={handleSearchChange} />
        <ResponsivePagination
          current={states.queryConfig.page}
          total={states.totalPage}
          onPageChange={(page) => {
            updateStates({
              ...states,
              queryConfig: {
                ...states.queryConfig,
                page,
              },
            });
          }}
          maxWidth={300}
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Hình ảnh
            </th>
            <th scope="col" className="px-6 py-3">
              Tên loại
            </th>
            <th scope="col" className="px-6 py-3">
              Mã
            </th>
            <th scope="col" className="px-6 py-3">
              Banner
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {states.categories &&
            states.categories.map((cate: ICategory) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={cate.id}
              >
                <td className="px-6 py-4">
                  <CdlImage w={60} h={60} id={cate.mainFileCLDId} />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {cate.name}
                </th>
                <td className="px-6 py-4">{cate.code}</td>
                <td className="px-6 py-4">{cate.bannerCode}</td>
                <td className="px-6 py-4 flex gap-x-2">
                  <UpdateModal category={cate} />
                  <DeleteModal category={cate} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
