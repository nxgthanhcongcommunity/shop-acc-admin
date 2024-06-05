import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { invoiceApi } from "../../api";
import { Search } from "../../components";
import { useDebounce } from "../../hooks";

const DataTable = () => {

  const [states, updateStates] = useState({
    invoices: [],
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

      const { succeed, data } = await invoiceApi.Get(states.queryConfig);
      if (!succeed) return;

      const { total, data: invoices } = data;
      updateStates({
        ...states,
        invoices: invoices,
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
            <th scope="col" className="px-6 py-3">email</th>
            <th scope="col" className="px-6 py-3">totalAmount</th>
            <th scope="col" className="px-6 py-3">discount</th>
            <th scope="col" className="px-6 py-3">paymentStatus</th>
            <th scope="col" className="px-6 py-3">paymentMethod</th>
            <th scope="col" className="px-6 py-3">createdAt</th>
          </tr>
        </thead>
        <tbody>
          {states.invoices &&
            states.invoices.map((invoiceDetail: any, index: number) => (
              <tr
                key={invoiceDetail.balanceId}
                className={`bg-white ${index === states.invoices.length - 1 ? '' : 'border-b'} dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {invoiceDetail.email}
                </th>
                <td className="px-6 py-4">{invoiceDetail.totalAmount}</td>
                <td className="px-6 py-4">{invoiceDetail.discount}</td>
                <td className="px-6 py-4">{invoiceDetail.paymentStatus}</td>
                <td className="px-6 py-4">{invoiceDetail.paymentMethod}</td>
                <td className="px-6 py-4">{invoiceDetail.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
