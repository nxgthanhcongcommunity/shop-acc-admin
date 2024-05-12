import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import categoryApi from "../../api/categoryApi";
import { AddIcon, PlusIcon } from "../../assets/icons";
import { Button, InputField, Modal, SelectField } from "../../components";
import { IBanner, ICategory } from "../../models";
import { bannerApi } from "../../api";

const CreateModal = ({ setToggleData }: any) => {
  const [toggle, setToggle] = useState(false);

  const [banners, setBanners] = useState<IBanner[]>();

  useEffect(() => {
    (async () => {
      const response = await bannerApi.getBanners({});

      if (response.status === 200 && response.data.succeed) {
        const { data: banners } = response.data.data;
        setBanners(banners);
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>();

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    setToggle(false);
    try {
      const { status: httpStatus, data: response } =
        await categoryApi.AddCategory(data);
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
          <div className="col-span-2">
            <InputField field="name" register={register} errors={errors} />
          </div>
          <div className="col-span-2">
            <InputField field="code" register={register} errors={errors} />
          </div>
          <div className="col-span-2">
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
