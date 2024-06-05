import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { categoryApi } from "../../api";
import productApi from "../../api/productApi";
import { EditIcon, SettingIcon } from "../../assets/icons";
import {
  Button,
  InputField,
  Modal,
  MultiInputsField,
  SelectField
} from "../../components";
import { MultiInputsFieldRef } from "../../components/multi-inputs-field";
import { IBanner, IProduct } from "../../models";

type Props = {
  product: IProduct;
};

const UpdateModal = ({ product }: Props) => {

  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState<IBanner[]>();

  const multiInputsFieldRef = useRef<MultiInputsFieldRef>(null);

  let initialItems = null;
  try {
    initialItems = JSON.parse(product.childsFilesCLDId).map((item: string) => {
      return {
        id: uuidv4(),
        value: item,
      }
    })
  } catch {

  }

  const handleGetItems = () => {
    if (multiInputsFieldRef.current) {
      const items = multiInputsFieldRef.current.getItems();
      return items.filter(item => ("" + item).length > 0);
    }
  };

  useEffect(() => {
    (async () => {
      const { succeed, data } = await categoryApi.GetCategories({});
      if (!succeed) return;

      setCategories(data.data);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: product,
  });

  const onSubmit: SubmitHandler<IProduct> = async (data) => {

    const multiInputItems = handleGetItems();
    data.childsFilesCLDId = JSON.stringify(multiInputItems);

    const response = await productApi.UpdateProduct(data);

    reset();
    setToggle(false);

  };

  return categories ? (
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
        <div className="grid gap-4 mb-4 grid-cols-3">
          <div>
            <InputField
              fieldName="Tên sản phẩm"
              field="name"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              type="number"
              fieldName="Giá tiền"
              field="price"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              type="number"
              fieldName="Số lượng"
              field="currentQuantity"
              register={register}
              errors={errors}
              defaultValue={1}
            />
          </div>
          <div>
            <InputField
              fieldName="Server"
              field="server"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <SelectField
              fieldName="Đăng nhập"
              field="loginType"
              items={[
                { name: "Google", code: "google" },
                { name: "Facebook", code: "facebook" },
              ].map(({ name, code }) => ({
                name: name,
                value: code,
              }))}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <div>
              <SelectField
                fieldName="Hệ điều hành"
                field="operatingSystem"
                items={[
                  { name: "Android", code: "android" },
                  { name: "IOS", code: "ios" },
                ].map(({ name, code }) => ({
                  name: name,
                  value: code,
                }))}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div>
            <InputField
              fieldName="Gem/Chono"
              field="gemChono"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              fieldName="Mô tả"
              field="descriptions"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <SelectField
              fieldName="Loại"
              field="categoryCode"
              items={categories && categories.map(({ name, code }) => ({
                name: name,
                value: code,
              }))}
              register={register}
              errors={errors}
            />
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-4">
            <div>
              <MultiInputsField ref={multiInputsFieldRef} initialItems={initialItems} />
            </div>
            <div>
              <InputField
                fieldName="Id ảnh chính"
                field="mainFileCLDId"
                register={register}
                errors={errors}
              />
            </div>
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
