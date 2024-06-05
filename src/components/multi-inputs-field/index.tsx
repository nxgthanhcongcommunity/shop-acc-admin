import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const SingleInputField = (props: any) => {

    const { initValue, handleChange, handleRemove } = props;

    return (
        <div className="flex gap-x-4">
            <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={initValue}
                onChange={handleChange}
            />
            <i className="ti ti-close cursor-pointer" onClick={handleRemove}></i>
        </div>
    )
}

interface IInputItem {
    id: string;
    value: string;
}

interface MultiInputsFieldProps {
    initialItems?: IInputItem[];
}

export interface MultiInputsFieldRef {
    getItems: () => string[];
}

const MultiInputsField = forwardRef<MultiInputsFieldRef, MultiInputsFieldProps>((props, ref) => {
    let {
        initialItems
    } = props;
    if (initialItems == null) {
        initialItems = [
            {
                id: uuidv4(),
                value: ''
            }
        ]
    }
    const [inputItems, setInputItems] = useState<IInputItem[]>(initialItems)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, changeIndex: number) => {
        const newItems = inputItems.map((item, index) =>
            index === changeIndex ? { ...item, value: e.target.value } : item
        );

        setInputItems(newItems);
    };

    const handleInputRemove = (removeIndex: number) => {

        const arr = inputItems.filter((item, index) => {

            return index != removeIndex;
        })

        setInputItems(arr)
    };

    useImperativeHandle(ref, () => ({
        getItems: () => inputItems.map(item => item.value)
    }))

    return (
        <>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Các hình ảnh con
            </label>
            <div >
                {
                    inputItems.map((item, index) => (
                        <SingleInputField
                            key={item.id}
                            initValue={item.value}
                            handleChange={(e: any) => handleInputChange(e, index)}
                            handleRemove={(e: any) => handleInputRemove(index)}
                        />
                    ))
                }
                <span onClick={() => { setInputItems([...inputItems, { id: uuidv4(), value: '' }]) }}>add</span>
            </div>
        </>
    );
});

export default MultiInputsField;
