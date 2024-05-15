import { useState } from "react";
import { useForm } from "react-hook-form";
import productApi from "../../api/productApi";
import { SettingIcon, TrashIcon } from "../../assets/icons";
import { Button, Modal } from "../../components";
import { IProduct } from "../../models";

type Props = {
  product: IProduct;
};
const DeleteModal = ({ product }: Props) => {
  const [toggle, setToggle] = useState(false);

  const { handleSubmit, reset } = useForm();

  const onSubmit = async () => {

    const response = await productApi.DeleteProduct(product);
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
          <div className="col-span-2">Delete {product.name} ?</div>
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
