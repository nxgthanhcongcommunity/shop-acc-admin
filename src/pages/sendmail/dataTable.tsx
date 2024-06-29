import { useEffect, useState } from "react";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { sendmailApi } from "../../api";
import { Search } from "../../components";
import { useDebounce } from "../../hooks";

const DataTable = () => {
  const [states, updateStates] = useState({
    sendmails: [],
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
      const { succeed, data } = await sendmailApi.Get(states.queryConfig);
      if (!succeed) return;

      const { total, data: sendmails } = data;

      updateStates({
        ...states,
        sendmails: sendmails,
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
              from
            </th>
            <th scope="col" className="px-6 py-3">
              to
            </th>
            <th scope="col" className="px-6 py-3">
              subject
            </th>
            <th scope="col" className="px-6 py-3">
              text
            </th>
            <th scope="col" className="px-6 py-3">
              attempTimes
            </th>
            <th scope="col" className="px-6 py-3">
              succeed
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
          {states.sendmails &&
            states.sendmails.map((sendmail: any, index: number) => (
              <tr
                key={sendmail.id}
                className={`bg-white ${
                  index === states.sendmails.length - 1 ? "" : "border-b"
                } dark1:bg-gray-800 dark1:border-gray-700 hover:bg-gray-50 dark1:hover:bg-gray-600`}
              >
                <td className="px-6 py-4">{sendmail.from}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark1:text-white"
                >
                  {sendmail.to}
                </th>
                <td className="px-6 py-4">{sendmail.subject}</td>
                <td className="px-6 py-4">{sendmail.text}</td>
                <td className="px-6 py-4">{+sendmail.attempTimes}</td>
                <td className="px-6 py-4">{sendmail.succeed}</td>
                <td className="px-6 py-4">{sendmail.createdAt}</td>
                <td className="px-6 py-4">{sendmail.updatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
