import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { transactionApi } from "../../api";
import { Search } from "../../components";
import { useDebounce } from "../../hooks";

const DataTable = () => {
  const [states, updateStates] = useState({
    transactions: [],
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
      const { succeed, data } = await transactionApi.Get(states.queryConfig);
      if (!succeed) return;

      const { total, data: transactions } = data;
      updateStates({
        ...states,
        transactions: transactions,
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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark1:text-gray-400 mt-4 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark1:bg-gray-700 dark1:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              transactionIdAtProvider
            </th>
            <th scope="col" className="px-6 py-3">
              gateway
            </th>
            <th scope="col" className="px-6 py-3">
              transactionDate
            </th>
            <th scope="col" className="px-6 py-3">
              accountNumber
            </th>
            <th scope="col" className="px-6 py-3">
              code
            </th>
            <th scope="col" className="px-6 py-3">
              content
            </th>
            <th scope="col" className="px-6 py-3">
              transferType
            </th>
            <th scope="col" className="px-6 py-3">
              transferAmount
            </th>
            <th scope="col" className="px-6 py-3">
              accumulated
            </th>
            <th scope="col" className="px-6 py-3">
              subAccount
            </th>
            <th scope="col" className="px-6 py-3">
              referenceCode
            </th>
            <th scope="col" className="px-6 py-3">
              description
            </th>
            <th scope="col" className="px-6 py-3">
              raw
            </th>
            <th scope="col" className="px-6 py-3">
              createdAt
            </th>
            <th scope="col" className="px-6 py-3">
              updatedAt
            </th>
          </tr>
        </thead>
        <tbody>
          {states.transactions &&
            states.transactions.map((transaction: any, index: number) => (
              <tr
                key={transaction.id}
                className={`bg-white ${
                  index === states.transactions.length - 1 ? "" : "border-b"
                } dark1:bg-gray-800 dark1:border-gray-700 hover:bg-gray-50 dark1:hover:bg-gray-600`}
              >
                <td className="px-6 py-4">
                  {transaction.transactionIdAtProvider}
                </td>
                <td className="px-6 py-4">{transaction.gateway}</td>
                <td className="px-6 py-4">{transaction.transactionDate}</td>
                <td className="px-6 py-4">{transaction.accountNumber}</td>
                <td className="px-6 py-4">{transaction.code}</td>
                <td className="px-6 py-4">{transaction.content}</td>
                <td className="px-6 py-4">{transaction.transferType}</td>
                <td className="px-6 py-4">{transaction.transferAmount}</td>
                <td className="px-6 py-4">{transaction.accumulated}</td>
                <td className="px-6 py-4">{transaction.subAccount}</td>
                <td className="px-6 py-4">{transaction.referenceCode}</td>
                <td className="px-6 py-4">{transaction.description}</td>
                <td className="px-6 py-4">{transaction.raw}</td>
                <td className="px-6 py-4">{transaction.createdAt}</td>
                <td className="px-6 py-4">{transaction.updatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
