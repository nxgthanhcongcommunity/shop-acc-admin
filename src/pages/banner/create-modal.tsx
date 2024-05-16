import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bannerApi } from "../../api";
import { AddIcon, PlusIcon } from "../../assets/icons";
import { Button, InputField, Modal } from "../../components";
import { IBanner } from "../../models";

const CreateModal = () => {
  const [toggle, setToggle] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBanner>();

  const onSubmit: SubmitHandler<IBanner> = async (data) => {

    const response = await bannerApi.AddBanner(data);

    reset();
    setToggle(false);
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
        toggle={toggle}
        setToggle={setToggle}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 mb-4 grid-cols-3">
          <div>
            <InputField fieldName="Banne name" field="name" register={register} errors={errors} />
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
