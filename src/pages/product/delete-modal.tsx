import { useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../api/categoryApi";
import { SettingIcon, TrashIcon } from "../../assets/icons";
import { Button, Modal } from "../../components";
import { ICategory } from "../../models";

type Props = {
  setToggleData: any;
  category: ICategory;
};
const DeleteModal = ({ setToggleData, category }: Props) => {
  const [toggle, setToggle] = useState(false);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setToggle(false);

    try {
      const { status: httpStatus, data: response } =
        await categoryApi.DeleteCategory(category);
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
          <div className="col-span-2">Delete {category.name} ?</div>
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
