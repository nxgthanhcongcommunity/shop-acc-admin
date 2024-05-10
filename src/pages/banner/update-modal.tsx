
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bannerApi } from "../../api";
import { IBanner } from "../../models";
import { CloseIcon, EditIcon, PlusIcon, SettingIcon } from "../../assets/icons";

type Props = {
    setToggleData: any,
    banner: IBanner,
}
const UpdateModal = ({ setToggleData, banner }: Props) => {
    const [toggle, setToggle] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<IBanner>({
        defaultValues: banner
    });

    const onSubmit: SubmitHandler<IBanner> = async (data) => {

        setToggle(false);

        try {
            const { status: httpStatus, data: response } = await bannerApi.UpdateBanner(data);
            if (httpStatus === 200 && response.succeed === true) {
                reset();
                setToggleData((prev: any) => !prev)
                alert("action succeed");
                return;
            }
        } catch (err) {
            console.log(err);
        }
        alert("action failed");
        reset();
    }

    return (
        <div>
            <div className="flex justify-end">
                <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <EditIcon />
                </button>
            </div>
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(0,0,0,0.4)] ${toggle ? "flex" : "hidden"
                    }`}
            >
                <div className="relative p-4 w-full max-w-[600px] max-h-full mt-[20vh]">
                    {/* Modal content */}
                    < div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update banner
                            </h3>
                            <button
                                onClick={() => setToggle((prev) => !prev)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <CloseIcon />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input id="name" placeholder="banner name..." {...register("name")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="code"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Code
                                    </label>
                                    <input id="code" placeholder="banner code..." {...register("code")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    {errors.code && <span>This field is required</span>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-x-4">
                                <button
                                    className="mt-4 text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    onClick={() => setToggle(prev => !prev)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <SettingIcon />
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UpdateModal;