import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi } from "../../api";
import { AddIcon, PlusIcon } from "../../assets/icons";
import { Button, FileUploader, InputField, Modal, SelectField } from "../../components";
import { ICategory, IProduct } from "../../models";
import productApi from "../../api/productApi";

const CreateModal = ({ setToggleData }: any) => {

  const [productChildFiles, setProductChildFiles] = useState<File[] | null>(null);
  const [productMainFile, setProductMainFile] = useState<File | null>(null);

  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    (async () => {
      const response = await categoryApi.GetCategories({});

      if (response.status === 200 && response.data.succeed) {
        const { data: categories } = response.data.data;
        setCategories(categories);
      }
    })();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

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
      formData.append(property, data[property])
    }

    setToggle(false);
    try {
      const { status: httpStatus, data: response } = await productApi.AddProduct(formData);
      if (httpStatus === 200 && response.succeed === true) {
        reset();
        setToggleData((prev: any) => !prev);
        alert("action succeed");
        return;
      }
    } catch (err) {
      console.log(err);
    }
    alert("action failed");
    reset();
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
            <InputField fieldName="Tên sản phẩm" field="name" register={register} errors={errors} />
          </div>
          <div>
            <InputField fieldName="Mã sản phẩm" field="code" register={register} errors={errors} />
          </div>
          <div>
            <InputField fieldName="Server" field="server" register={register} errors={errors} />
          </div>
          <div>
            <SelectField
              fieldName="Đăng nhập"
              field="loginType"
              items={[{ name: 'Google', code: 'google' }, { name: 'Facebook', code: 'facebook' }].map(({ name, code }) => ({
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
                items={[{ name: 'Android', code: 'android' }, { name: 'IOS', code: 'ios' }].map(({ name, code }) => ({
                  name: name,
                  value: code,
                }))}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div>
            <InputField fieldName="Gem/Chono" field="gemChono" register={register} errors={errors} />
          </div>
          <div>
            <InputField fieldName="Mô tả" field="descriptions" register={register} errors={errors} />
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
            <FileUploader fieldName="Các hình ảnh con" id="file-uploader-1" onFileSelect={handleProductChildFilesChange} multiple />
            <FileUploader fieldName="Hình ảnh chính" id="file-uploader-2" onFileSelect={handleProductMainFileChange} />
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
