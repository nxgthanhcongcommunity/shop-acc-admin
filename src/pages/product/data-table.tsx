import { useEffect, useState } from "react";

import DeleteModal from "./delete-modal";
import UpdateModal from "./update-modal";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import categoryApi from "../../api/categoryApi";
import { MicIcon } from "../../assets/icons";
import { ICategory, IProduct } from "../../models";
import productApi from "../../api/productApi";
import { useDebounce } from "../../hooks";
import { Search } from "../../components";

const DataTable = () => {

  const { REACT_APP_API_URL } = process.env

  const [states, updateStates] = useState({
    products: [],
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

      const response = await productApi.GetProducts(states.queryConfig);
      if (response == null) return;

      const { total, data: products } = response;
      updateStates({
        ...states,
        products,
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
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Product code
            </th>
            <th scope="col" className="px-6 py-3">
              Main img
            </th>
            <th scope="col" className="px-6 py-3">
              childs img
            </th>
            <th scope="col" className="px-6 py-3">
              server
            </th>
            <th scope="col" className="px-6 py-3">
              login type
            </th>
            <th scope="col" className="px-6 py-3">
              operating
            </th>
            <th scope="col" className="px-6 py-3">
              gemChono
            </th>
            <th scope="col" className="px-6 py-3">
              descriptions
            </th>
            <th scope="col" className="px-6 py-3">
              categoryCode
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {states.products &&
            states.products.map((product: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={product.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.code}</td>
                <td className="px-6 py-4">
                  <img
                    src={`${REACT_APP_API_URL}/public/products/${product.mainFileUrl}`}
                    alt=""
                    className="w-16"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-1">
                    {JSON.parse(product.childsFilesUrl).map((url: any) => (
                      <img
                        key={url}
                        src={`${REACT_APP_API_URL}/public/products/${url}`}
                        alt=""
                        className="w-16"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{product.server}</td>
                <td className="px-6 py-4">{product.loginType}</td>
                <td className="px-6 py-4">{product.operatingSystem}</td>
                <td className="px-6 py-4">{product.gemChono}</td>
                <td className="px-6 py-4">{product.descriptions}</td>
                <td className="px-6 py-4">{product.categoryCode}</td>

                <td className="px-6 py-4 flex gap-x-2">
                  <UpdateModal product={product} />
                  <DeleteModal product={product} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </>
  );
};

export default DataTable;