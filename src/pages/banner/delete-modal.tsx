import { useState } from "react";
import { bannerApi } from "../../api";
import { CloseIcon, SettingIcon, TrashIcon } from "../../assets/icons";
import { IBanner } from "../../models";
import { Button, Modal } from "../../components";
import { useForm } from "react-hook-form";

type Props = {
  setToggleData: any;
  banner: IBanner;
};
const DeleteModal = ({ setToggleData, banner }: Props) => {
  const [toggle, setToggle] = useState(false);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setToggle(false);

    try {
      const { status: httpStatus, data: response } =
        await bannerApi.DeleteBanner(banner);
      if (httpStatus === 200 && response.succeed === true) {
        setToggleData((prev: any) => !prev);
        alert("action succeed");
        return;
      }
    } catch (err) {
      console.log(err);
    }
    alert("action failed");
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
