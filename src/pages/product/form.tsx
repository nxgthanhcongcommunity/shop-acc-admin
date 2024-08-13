import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi } from "../../api";
import productApi from "../../api/productApi";
import { InputField, MultiInputsField, SelectField } from "../../components";
import { MultiInputsFieldRef } from "../../components/multi-inputs-field";
import { TOASTMSG_TYPES } from "../../constants";
import { ICategory, IProduct } from "../../models";
import { useToast } from "../../providers/toastProvider";
import { v4 as uuidv4 } from "uuid";

const Form = (props: any) => {
  const { selectedAction, setSelectedAction } = props;
  const [categories, setCategories] = useState<ICategory[]>();
  const multiInputsFieldRef = useRef<MultiInputsFieldRef>(null);

  const { addToastMessage } = useToast();

  useEffect(() => {
    selectedAction && reset(selectedAction.record);

    try {
      const existItems = JSON.parse(selectedAction.record.childsFilesCLDId).map(
        (item: string) => {
          return {
            id: uuidv4(),
            value: item,
          };
        }
      );
      multiInputsFieldRef.current?.setItems(existItems);
    } catch {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAction]);

  useEffect(() => {
    (async () => {
      const { succeed, data } = await categoryApi.GetCategories({});
      if (!succeed) return;

      setCategories(data.data);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>(selectedAction);

  const handleGetItems = () => {
    if (multiInputsFieldRef.current) {
      const items = multiInputsFieldRef.current.getItems();
      return items.filter((item) => ("" + item).length > 0);
    }
  };

  const handleFormSubmit: SubmitHandler<IProduct> = async (data) => {
    const multiInputItems = handleGetItems();
    data.childsFilesCLDId = JSON.stringify(multiInputItems);

    let response;

    switch (selectedAction.action) {
      case "create":
        response = await productApi.AddProduct(data);
        break;
      case "update":
        response = await productApi.UpdateProduct(data);
        break;
      case "delete":
        response = await productApi.DeleteProduct(data);
        break;
    }

    if (response?.succeed) {
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
        price: 0,
        quantity: {
          currentQuantity: 0,
        },
        server: "",
        loginType: "",
        operatingSystem: "",
        gemChono: 0,
        descriptions: "",
        categoryId: "",
        mainFileCLDId: "",
      },
    });
    if (multiInputsFieldRef.current) {
      multiInputsFieldRef.current.resetItems();
    }
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow mb-4">
      <form className="space-y-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <h5 className="text-lg font-medium text-gray-900 mb-6">
          Quản lý Acc game
        </h5>
        <div className="grid grid-cols-4 gap-x-8 gap-y-4">
          <InputField
            fieldName="Tên sản phẩm"
            field="name"
            register={register}
            errors={errors}
          />
          <InputField
            type="number"
            fieldName="Giá tiền"
            field="price"
            register={register}
            errors={errors}
          />
          <InputField
            type="number"
            fieldName="Số lượng hiện tại"
            field="quantity.currentQuantity"
            register={register}
            errors={errors}
            defaultValue={1}
          />
          <SelectField
            fieldName="Server"
            field="server"
            items={[
              { name: "VietNam", code: "VietNam" },
              { name: "ChauAu", code: "ChauAu" },
            ].map(({ name, code }) => ({
              name: name,
              value: code,
            }))}
            register={register}
            errors={errors}
          />
          <SelectField
            fieldName="Đăng nhập"
            field="loginType"
            items={[
              { name: "Google", code: "google" },
              { name: "Facebook", code: "facebook" },
            ].map(({ name, code }) => ({
              name: name,
              value: code,
            }))}
            register={register}
            errors={errors}
          />
          <SelectField
            fieldName="Hệ điều hành"
            field="operatingSystem"
            items={[
              { name: "Android", code: "android" },
              { name: "IOS", code: "ios" },
            ].map(({ name, code }) => ({
              name: name,
              value: code,
            }))}
            register={register}
            errors={errors}
          />
          <InputField
            fieldName="Gem/Chono"
            field="gemChono"
            register={register}
            errors={errors}
          />
          <InputField
            fieldName="Mô tả"
            field="descriptions"
            register={register}
            errors={errors}
          />
          <SelectField
            fieldName="Loại"
            field="categoryId"
            items={categories?.map(({ id, name }) => ({
              name: name,
              value: id,
            }))}
            register={register}
            errors={errors}
          />
          <MultiInputsField ref={multiInputsFieldRef} initialItems={null} />
          <InputField
            fieldName="Id ảnh chính"
            field="mainFileCLDId"
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
