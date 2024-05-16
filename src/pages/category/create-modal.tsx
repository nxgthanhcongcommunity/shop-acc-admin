import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import categoryApi from "../../api/categoryApi";
import { AddIcon, PlusIcon } from "../../assets/icons";
import { Button, FileUploader, InputField, Modal, SelectField } from "../../components";
import { IBanner, ICategory } from "../../models";
import { bannerApi } from "../../api";

const CreateModal = () => {
  const [toggle, setToggle] = useState(false);

  const [banners, setBanners] = useState<IBanner[]>();

  const [categoryMainFile, setCategoryMainFile] = useState<File | null>(null);


  useEffect(() => {
    (async () => {
      const response = await bannerApi.getBanners({});

      if (response == null) {
        alert("action failed!");
        return;
      }

      const { data: banners } = response;
      setBanners(banners);

    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>();

  const onSubmit: SubmitHandler<ICategory> = async (data) => {

    const formData = new FormData();

    if (categoryMainFile != null) {
      formData.append(`main-file`, categoryMainFile, categoryMainFile.name);
    }

    for (const property in data) {
      formData.append(property, data[property].toString())
    }

    const response = await categoryApi.AddCategory(formData);


    reset();
    setToggle(false);

  };

  const handleProductMainFileChange = (files: File[]) => {
    setCategoryMainFile(files[0]);
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
        modalName="Tạo loại sản phẩm mới"
        toggle={toggle}
        setToggle={setToggle}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div>
            <InputField field="name" register={register} errors={errors} />
          </div>
          <div>
            <SelectField
              field="bannerCode"
              items={banners?.map((banner) => ({
                name: banner.name,
                value: banner.code,
              }))}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <FileUploader fieldName="Hình ảnh" id="category-file-uploader" onFileSelect={handleProductMainFileChange} />
          </div>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button skin="alter" onClick={() => setToggle((prev) => !prev)}>
            Cancel
          </Button>
          <Button skin="default" type="submit">
            <span className="flex">
              <PlusIcon />
              Add banner
            </span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateModal;
