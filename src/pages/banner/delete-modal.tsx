import { useState } from "react";
import { bannerApi } from "../../api";
import { CloseIcon, SettingIcon, TrashIcon } from "../../assets/icons";
import { IBanner } from "../../models";
import { Button, Modal } from "../../components";
import { useForm } from "react-hook-form";

type Props = {
  banner: IBanner;
};
const DeleteModal = ({ banner }: Props) => {
  const [toggle, setToggle] = useState(false);

  const { handleSubmit, reset } = useForm();

  const onSubmit = async () => {

    const response = await bannerApi.DeleteBanner(banner);
    if (response == null) {
      alert("action failed!");
      return;
    }

    setToggle(false);
    reset();
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setToggle((prev) => !prev)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          skin="danger"
        >
          <TrashIcon />
        </Button>
      </div>
      <Modal
        toggle={toggle}
        setToggle={setToggle}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">Delete {banner.name} ?</div>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button onClick={() => setToggle((prev) => !prev)} skin="alter">
            Cancel
          </Button>
          <Button skin="danger" type="submit">
            <SettingIcon />
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
