import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { accountApi } from "../../api";
import { Search } from "../../components";
import { IAccount } from "../../models";
import { useDebounce } from "../../hooks";

const DataTable = () => {

  const [states, updateStates] = useState({
    accounts: [],
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

      const { succeed, data } = await accountApi.GetAccounts(states.queryConfig);
      if (!succeed) return;

      const { total, data: accounts } = data;
      updateStates({
        ...states,
        accounts: accounts,
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
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">photo</th>
            <th scope="col" className="px-6 py-3">familyName</th>
            <th scope="col" className="px-6 py-3">givenName</th>
            <th scope="col" className="px-6 py-3">isVerifyEmail</th>
            <th scope="col" className="px-6 py-3">providerName</th>
            <th scope="col" className="px-6 py-3">role</th>
          </tr>
        </thead>
        <tbody>
          {states.accounts &&
            states.accounts.map((account: IAccount, index: number) => (
              <tr
                key={account.id}
                className={`bg-white ${index === states.accounts.length - 1 ? '' : 'border-b'} dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {account.email}
                </th>
                <td className="px-6 py-4">{account.balance.amount}</td>
                <td className="px-6 py-4">
                  <img
                    src={account.photo}
                    alt=""
                    className="w-16"
                  />
                </td>
                <td className="px-6 py-4">{account.familyName}</td>
                <td className="px-6 py-4">{account.givenName}</td>
                <td className="px-6 py-4">{account.isVerifyEmail}</td>
                <td className="px-6 py-4">{account.providerName}</td>
                <td className="px-6 py-4">{account.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
