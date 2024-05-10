
import { useEffect, useState } from "react";
import { bannerApi } from "../../api";
import DeleteModal from "./delete-modal";
import UpdateModal from "./update-modal";

import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { IBanner } from "../../models";
import { MicIcon } from "../../assets/icons";

const DataTable = ({ reloadToggle, setToggleData }: { reloadToggle: boolean, setToggleData: any }) => {

    const [totalPage, setTotalPage] = useState(0);
    const [queryConfig, setQueryConfig] = useState({
        page: 1,
        limit: 5,
        name: ''
    })
    const [debouncedTerm, setDebouncedTerm] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(queryConfig.name);
        }, 2000);

        return () => {
            clearTimeout(timerId);
        };
    }, [queryConfig.name]);

    const [banners, setBanners] = useState<IBanner[]>([]);

    useEffect(() => {
        (async () => {
            const response = await bannerApi.getBanners(queryConfig);

            if (response.status === 200 && response.data.succeed) {
                const { total, data: banners } = response.data.data;
                setBanners(banners);
                setTotalPage(Math.ceil(total / queryConfig.limit));
            }
        })();
    }, [queryConfig.page, reloadToggle, debouncedTerm]);

    const handleSearchChange = (e: any) => {
        setQueryConfig({ ...queryConfig, page: 1, name: e.target.value });
    }

    return (
        <>
            <div className="flex items-center max-w-lg mx-auto">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                        </svg>
                    </div>
                    <input value={queryConfig.name} onChange={handleSearchChange} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <MicIcon />
                    </button>
                </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 overflow-y-scroll">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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
                    {banners &&
                        banners.map(({ id, name, code }: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {name}
                                </th>
                                <td className="px-6 py-4">{code}</td>
                                <td className="px-6 py-4 flex gap-x-2">
                                    <UpdateModal setToggleData={setToggleData} banner={({ id, name, code })} />
                                    <DeleteModal setToggleData={setToggleData} banner={({ id, name, code })} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="my-12">
                <ResponsivePagination
                    current={queryConfig.page}
                    total={totalPage}
                    onPageChange={page => {
                        setQueryConfig({
                            ...queryConfig,
                            page: page,
                        })
                    }}
                    maxWidth={300}
                />
            </div>
        </>
    )
}

export default DataTable