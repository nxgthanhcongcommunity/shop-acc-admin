import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SingleInputField = (props: any) => {
  const { initValue, handleChange, handleRemove } = props;

  return (
    <div className="flex gap-x-4">
      <input
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500 dark1:shadow-sm-light"
        value={initValue}
        onChange={handleChange}
      />
      <i className="ti ti-close cursor-pointer" onClick={handleRemove}></i>
    </div>
  );
};

interface IInputItem {
  id: string;
  value: string;
}

interface MultiInputsFieldProps {
  initialItems?: IInputItem[] | null;
}

export interface MultiInputsFieldRef {
  getItems: () => string[];
  resetItems: () => void;
}

const MultiInputsField = forwardRef<MultiInputsFieldRef, MultiInputsFieldProps>(
  (props, ref) => {
    const { initialItems } = props;
    const [inputItems, setInputItems] = useState<IInputItem[]>(() => {
      return initialItems == null
        ? [
            {
              id: uuidv4(),
              value: "",
            },
          ]
        : initialItems;
    });

    const handleInputChange = (
      e: ChangeEvent<HTMLInputElement>,
      changeIndex: number
    ) => {
      const newItems = inputItems.map((item, index) =>
        index === changeIndex ? { ...item, value: e.target.value } : item
      );

      setInputItems(newItems);
    };

    const handleInputRemove = (removeIndex: number) => {
      const arr = inputItems.filter((item, index) => {
        return index != removeIndex;
      });

      setInputItems(arr);
    };

    useImperativeHandle(ref, () => ({
      getItems: () => inputItems.map((item) => item.value),
      resetItems: () => {
        setInputItems([
          {
            id: uuidv4(),
            value: "",
          },
        ]);
      },
    }));

    return (
      <>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark1:text-white">
          Các hình ảnh con
        </label>
        <div>
          {inputItems.map((item, index) => (
            <SingleInputField
              key={item.id}
              initValue={item.value}
              handleChange={(e: any) => handleInputChange(e, index)}
              handleRemove={(e: any) => handleInputRemove(index)}
            />
          ))}
          <span
            onClick={() => {
              setInputItems([...inputItems, { id: uuidv4(), value: "" }]);
            }}
          >
            add
          </span>
        </div>
      </>
    );
  }
);

export default MultiInputsField;
