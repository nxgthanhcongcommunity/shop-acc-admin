import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryApi, masterDataApi } from "../../api";
import { EditIcon, SettingIcon } from "../../assets/icons";
import { Button, InputField, Modal, SelectField } from "../../components";
import { IBanner, ICategory } from "../../models";

type Props = {
  category: ICategory;
};
const UpdateModal = ({ category }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [banners, setBanners] = useState<IBanner[]>();

  useEffect(() => {
    (async () => {
      const response = await masterDataApi.getByKey({
        key: "home-page",
      });

      if (response == null) {
        alert("action failed");
        return;
      }

      setBanners(response.banners);
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

    if (response == null) {
      alert("action failed");
      return;
    }

    reset();
    setToggle(false);
  };

  return banners ? (
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
        <div className="grid gap-4 mb-4 grid-cols-2">
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
              fieldName="Banner"
              field="code"
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
