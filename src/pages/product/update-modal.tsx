import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi } from "../../api";
import productApi from "../../api/productApi";
import { EditIcon, SettingIcon } from "../../assets/icons";
import {
  Button,
  FileUploader,
  InputField,
  Modal,
  SelectField,
} from "../../components";
import { IBanner, IProduct } from "../../models";

type Props = {
  product: IProduct;
};
const UpdateModal = ({ product }: Props) => {
  const { REACT_APP_API_URL } = process.env;

  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState<IBanner[]>();

  const [productChildFiles, setProductChildFiles] = useState<File[] | null>(
    null
  );
  const [productMainFile, setProductMainFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const response = await categoryApi.GetCategories({});
      if (response == null) {
        alert("action failed");
        return;
      }
      setCategories(response.data);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: product,
  });

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    const formData = new FormData();

    if (productChildFiles != null) {
      [...productChildFiles].forEach((file, index) => {
        formData.append(`child-files`, file, file.name);
      });
    }

    if (productMainFile != null) {
      formData.append(`main-file`, productMainFile, productMainFile.name);
    }

    for (const property in data) {
      formData.append(property, data[property].toString());
    }

    const response = await productApi.UpdateProduct(formData);
    if (response == null) {
      alert("action failed");
      return;
    }

    reset();
    setToggle(false);
  };

  const handleProductChildFilesChange = (files: File[]) => {
    setProductChildFiles(files);
  };

  const handleProductMainFileChange = (files: File[]) => {
    setProductMainFile(files[0]);
  };

  return categories ? (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setToggle((prev) => !prev)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          skin="default"
        >
          <EditIcon />
        </Button>
      </div>
      <Modal
        toggle={toggle}
        setToggle={setToggle}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 mb-4 grid-cols-3">
          <div>
            <InputField
              fieldName="Tên sản phẩm"
              field="name"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              fieldName="Mã sản phẩm"
              field="code"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              fieldName="Server"
              field="server"
              register={register}
              errors={errors}
            />
          </div>
          <div>
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
          </div>
          <div>
            <div>
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
            </div>
          </div>
          <div>
            <InputField
              fieldName="Gem/Chono"
              field="gemChono"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              fieldName="Mô tả"
              field="descriptions"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <SelectField
              fieldName="Loại"
              field="categoryCode"
              items={categories?.map(({ name, code }) => ({
                name: name,
                value: code,
              }))}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              {product.childsFilesUrl &&
                JSON.parse(product.childsFilesUrl).map((url: any) => (
                  <img
                    key={url}
                    src={`${REACT_APP_API_URL}/public/products/${url}`}
                    alt=""
                    className="w-28 object-cover"
                  />
                ))}
            </div>
            <div className="grid place-content-center">
              <img
                src={`${REACT_APP_API_URL}/public/products/${product.mainFileUrl}`}
                alt=""
                className="w-32"
              />
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <FileUploader
              fieldName="Hình ảnh con"
              id="update-file-uploader-1"
              onFileSelect={handleProductChildFilesChange}
              multiple
            />
            <FileUploader
              fieldName="Hình ảnh chính"
              id="update-file-uploader-2"
              onFileSelect={handleProductMainFileChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button skin="alter" onClick={() => setToggle((prev) => !prev)}>
            Cancel
          </Button>
          <Button skin="default" type="submit">
            <span className="flex">
              <SettingIcon />
              Update
            </span>
          </Button>
        </div>
      </Modal>
    </div>
  ) : (
    <></>
  );
};

export default UpdateModal;
