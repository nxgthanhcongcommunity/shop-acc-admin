import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { quantityApi } from "../../api";
import { Search } from "../../components";
import { useDebounce } from "../../hooks";

const DataTable = () => {

  const [states, updateStates] = useState({
    quantities: [],
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

      const { succeed, data } = await quantityApi.Get(states.queryConfig);
      if (!succeed) return;

      const { total, data: quantities } = data;
      updateStates({
        ...states,
        quantities: quantities,
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
            <th scope="col" className="px-6 py-3">productName</th>
            <th scope="col" className="px-6 py-3">productCode</th>
            <th scope="col" className="px-6 py-3">currentQuantity</th>
            <th scope="col" className="px-6 py-3">soldQuantity</th>
            <th scope="col" className="px-6 py-3">comingQuantity</th>
          </tr>
        </thead>
        <tbody>
          {states.quantities &&
            states.quantities.map((quantity: any, index: number) => (
              <tr
                key={quantity.id}
                className={`bg-white ${index === states.quantities.length - 1 ? '' : 'border-b'} dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {quantity.productName}
                </th>
                <td className="px-6 py-4">{quantity.productCode}</td>
                <td className="px-6 py-4">{+quantity.currentQuantity}</td>
                <td className="px-6 py-4">{+quantity.soldQuantity}</td>
                <td className="px-6 py-4">{+quantity.comingQuantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
