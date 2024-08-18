import { useEffect, useState } from "react";
import { IBanner, ICategory } from "../../models";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components";
import { useToast } from "../../providers/toastProvider";
import { TOASTMSG_TYPES } from "../../constants";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../api/categoryApi";
import { useGetMasterDataQuery } from "../../api/masterDataApi";

const Form = (props: any) => {
  const { selectedAction, setSelectedAction } = props;

  const { addToastMessage } = useToast();

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    selectedAction && reset(selectedAction.record);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAction]);

  const { data } = useGetMasterDataQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>(selectedAction);

  const handleFormSubmit: SubmitHandler<ICategory> = async (data) => {
    let response;

    switch (selectedAction.action) {
      case "create":
        response = await addCategory(data);
        break;
      case "update":
        response = await updateCategory(data);
        break;
      case "delete":
        response = await deleteCategory(data);
        break;
    }

    if (response?.data != null) {
      addToastMessage({
        id: "" + Date.now(),
        type: TOASTMSG_TYPES.SUCCESS,
        title: "Thao tác thành công",
        content: "",
      });
    } else {
      addToastMessage({
        id: "" + Date.now(),
        type: TOASTMSG_TYPES.ERROR,
        title: "Có lỗi xảy ra",
        content: "Vui lòng liên hệ admin",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setSelectedAction({
      action: "create",
      record: {
        name: "",
        mainFileCLDId: "",
        bannerCode: "",
      },
    });
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow mb-4">
      <form className="space-y-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <h5 className="text-lg font-medium text-gray-900 mb-6">
          Quản lý loại acc
        </h5>
        <div className="grid grid-cols-4 gap-x-8 gap-y-4">
          <InputField
            fieldName="Tên loại"
            field="name"
            register={register}
            errors={errors}
          />
          <InputField
            fieldName="Cloudiary Id"
            field="mainFileCLDId"
            register={register}
            errors={errors}
          />
          <SelectField
            fieldName="Banner"
            field="bannerCode"
            items={(data?.banners as IBanner[])?.map((banner) => ({
              name: banner.name,
              value: banner.code,
            }))}
            register={register}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-4">
          <div className="flex gap-x-2 col-start-3 justify-end">
            <span
              onClick={resetForm}
              className="cursor-pointer py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              Clear
            </span>
            <button
              type="submit"
              className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
