import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import accountApi from "../../api/accountApi";
import { Search } from "../../components";
import { IAccount } from "../../models";

type Props = {
  reloadToggle: boolean;
  setToggleData: any;
}

const DataTable = ({ reloadToggle, setToggleData }: Props) => {

  const [accounts, setAccounts] = useState([]);

  const [totalPage, setTotalPage] = useState(0);
  const [queryConfig, setQueryConfig] = useState({
    page: 1,
    limit: 5,
    name: "",
  });


  const [debouncedTerm, setDebouncedTerm] = useState("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(queryConfig.name);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [queryConfig.name]);


  useEffect(() => {
    (async () => {
      const response = await accountApi.GetAccounts(queryConfig);

      if (response.status === 200 && response.data.succeed) {
        const { total, data: accounts } = response.data.data;
        setAccounts(accounts);
        setTotalPage(Math.ceil(total / queryConfig.limit));
      }
    })();
  }, [queryConfig.page, reloadToggle, debouncedTerm]);

  const handleSearchChange = (currentValue: string) => {
    setQueryConfig({ ...queryConfig, page: 1, name: currentValue });
  };

  return (
    <>
      <Search onTextChange={handleSearchChange} />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">photo</th>
            <th scope="col" className="px-6 py-3">familyName</th>
            <th scope="col" className="px-6 py-3">givenName</th>
            <th scope="col" className="px-6 py-3">idAtProvider</th>
            <th scope="col" className="px-6 py-3">isVerifyEmail</th>
            <th scope="col" className="px-6 py-3">providerName</th>
            <th scope="col" className="px-6 py-3">role</th>
          </tr>
        </thead>
        <tbody>
          {accounts &&
            accounts.map((account: IAccount) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={account.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {account.email}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={account.photo}
                    alt=""
                    className="w-16"
                  />
                </td>
                <td className="px-6 py-4">{account.familyName}</td>
                <td className="px-6 py-4">{account.givenName}</td>
                <td className="px-6 py-4">{account.idAtProvider}</td>
                <td className="px-6 py-4">{account.isVerifyEmail}</td>
                <td className="px-6 py-4">{account.providerName}</td>
                <td className="px-6 py-4">{account.role}</td>
                {/* <td className="px-6 py-4 flex gap-x-2">
                  <UpdateModal
                    setToggleData={setToggleData}
                    category={{ id, name, code, bannerCode }}
                  />
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="my-12">
        <ResponsivePagination
          current={queryConfig.page}
          total={totalPage}
          onPageChange={(page) => {
            setQueryConfig({
              ...queryConfig,
              page: page,
            });
          }}
          maxWidth={300}
        />
      </div>
    </>
  );
};

export default DataTable;
