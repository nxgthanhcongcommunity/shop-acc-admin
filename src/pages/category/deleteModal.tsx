import { useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../api/categoryApi";
import { SettingIcon, TrashIcon } from "../../assets/icons";
import { Button, Modal } from "../../components";
import { ICategory } from "../../models";

type Props = {
  category: ICategory;
};
const DeleteModal = ({ category }: Props) => {
  const [toggle, setToggle] = useState(false);

  const { handleSubmit, reset } = useForm();

  const onSubmit = async () => {
    const response = await categoryApi.DeleteCategory(category);
    if (response == null) {
      alert("action failed");
      return;
    }

    reset();
    setToggle(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <span onClick={() => setToggle((prev) => !prev)}>
          <TrashIcon />
        </span>
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
