import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bannerApi } from "../../api";
import { IBanner } from "../../models";
import { CloseIcon, EditIcon, PlusIcon, SettingIcon } from "../../assets/icons";
import { Button, InputField, Modal } from "../../components";

type Props = {
  setToggleData: any;
  banner: IBanner;
};
const UpdateModal = ({ setToggleData, banner }: Props) => {
  const [toggle, setToggle] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBanner>({
    defaultValues: banner,
  });

  const onSubmit: SubmitHandler<IBanner> = async (data) => {
    setToggle(false);

    try {
      const { status: httpStatus, data: response } =
        await bannerApi.UpdateBanner(data);
      if (httpStatus === 200 && response.succeed === true) {
        setToggleData((prev: any) => !prev);
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
          <div className="col-span-2">
            <InputField field="name" register={register} errors={errors} />
          </div>
          <div className="col-span-2">
            <InputField field="code" register={register} errors={errors} />
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
  );
};

export default UpdateModal;
