import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi } from "../../api";
import productApi from "../../api/productApi";
import { AddIcon, PlusIcon } from "../../assets/icons";
import {
  Button,
  FileUploader,
  InputField,
  Modal,
  SelectField,
  TextareaField,
} from "../../components";
import { ICategory, IProduct } from "../../models";

const CreateModal = ({ setToggleData }: any) => {
  const [productChildFiles, setProductChildFiles] = useState<File[] | null>(
    null
  );
  const [productMainFile, setProductMainFile] = useState<File | null>(null);

  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>();

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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log(data);

    const formData = new FormData();

    const arrId = data.childsFilesCLDId.split("\n");
    const arrIdTrimed = arrId.map((item) => item.trim());

    data.childsFilesCLDId = JSON.stringify(arrIdTrimed);

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

    const response = await productApi.AddProduct(formData);
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

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setToggle((prev) => !prev)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          skin="default"
        >
          <AddIcon />
        </Button>
      </div>
      <Modal
        modalName="Tạo sản phẩm mới"
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
              type="number"
              fieldName="Giá tiền"
              field="price"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              type="number"
              fieldName="Số lượng"
              field="currentQuantity"
              register={register}
              errors={errors}
              defaultValue={1}
            />
          </div>
          <div>
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
            <div>
              <TextareaField
                fieldName="Id các hình ảnh con"
                field="childsFilesCLDId"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                fieldName="Id ảnh chính"
                field="mainFileCLDId"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <FileUploader
              fieldName="Các hình ảnh con"
              id="file-uploader-1"
              onFileSelect={handleProductChildFilesChange}
              multiple
            />
            <FileUploader
              fieldName="Hình ảnh chính"
              id="file-uploader-2"
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
              <PlusIcon />
              Add product
            </span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateModal;
