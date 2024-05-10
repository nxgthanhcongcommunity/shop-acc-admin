import { useForm, SubmitHandler } from "react-hook-form"

const CreateForm = () => {
    type Inputs = {
        bannerName: string
        bannerCode: string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    // console.log(watch("example"))

    return (
        <form className="max-w-[90%] mx-auto my-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 grid grid-cols-3 gap-4">
                <div>
                    <label
                        htmlFor="bannerName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Banner name
                    </label>
                    <input id="bannerName" placeholder="banner name here..." {...register("bannerName", { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {errors.bannerName && <span>This field is required</span>}
                </div>
                <div>
                    <label
                        htmlFor="bannerCode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Banner code
                    </label>
                    <input id="bannerCode" placeholder="banner name here..." {...register("bannerCode", { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {errors.bannerCode && <span>This field is required</span>}
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Create
                </button>
            </div>
        </form>
    )

}

export default CreateForm;