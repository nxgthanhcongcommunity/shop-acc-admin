import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi, masterDataApi } from "../../api";
import { EditIcon, SettingIcon } from "../../assets/icons";
import { Button, InputField, Modal, SelectField } from "../../components";
import { IBanner, ICategory } from "../../models";

interface IUpdateModalProps {
  category: ICategory;
}

const UpdateModal = ({ category }: IUpdateModalProps) => {
  const [toggle, setToggle] = useState(false);
  const [banners, setBanners] = useState<IBanner[]>();

  useEffect(() => {
    (async () => {
      const { succeed, data } = await masterDataApi.getByKey({
        key: "home-page",
      });

      if (!succeed) return;

      setBanners(data.banners);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    defaultValues: category,
  });

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    const response = await categoryApi.UpdateCategory(data);

    console.log(response);

    reset();
    setToggle(false);
  };

  return banners ? (
    <div>
      <div className="flex justify-end">
        <span onClick={() => setToggle((prev) => !prev)}>
          <EditIcon />
        </span>
      </div>
      <Modal
        toggle={toggle}
        setToggle={setToggle}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 mb-4">
          <div>
            <InputField
              fieldName="Tên loại"
              field="name"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              fieldName="Cloudiary Id"
              field="mainFileCLDId"
              register={register}
              errors={errors}
            />
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
