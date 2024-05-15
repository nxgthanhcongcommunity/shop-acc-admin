import { useEffect, useState } from "react";
import { bannerApi } from "../../api";
import DeleteModal from "./delete-modal";
import UpdateModal from "./update-modal";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { MicIcon } from "../../assets/icons";
import { IBanner } from "../../models";
import { useDebounce } from "../../hooks";
import { Search } from "../../components";

const DataTable = () => {

  const [states, updateStates] = useState({
    banners: [],
    totalPage: 0,
    queryConfig: {
      page: 1,
      limit: 5,
      name: "",
    }
  })

  const debouncedName = useDebounce(states.queryConfig.name, 1000);

  useEffect(() => {

    (async () => {

      const response = await bannerApi.getBanners(states.queryConfig);
      if (response == null) return;

      const { total, data: banners } = response;
      updateStates({
        ...states,
        banners: banners,
        totalPage: Math.ceil(total / states.queryConfig.limit)
      });

    })();

  }, [states.queryConfig.page, debouncedName]);

  const handleSearchChange = (currentValue: string) => {

    updateStates({
      ...states,
      queryConfig: {
        ...states.queryConfig,
        page: 1,
        name: currentValue
      }
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
              }
            })

          }}
          maxWidth={300}
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order
            </th>
            <th scope="col" className="px-6 py-3">
              Banner name
            </th>
            <th scope="col" className="px-6 py-3">
              Banner code
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {states.banners &&
            states.banners.map((banner: IBanner) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={banner.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {banner.order}
                </th>
                <td className="px-6 py-4">{banner.name}</td>
                <td className="px-6 py-4">{banner.code}</td>
                <td className="px-6 py-4 flex gap-x-2">
                  <UpdateModal banner={banner} />
                  <DeleteModal banner={banner} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </>
  );
};

export default DataTable;
