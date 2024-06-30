const Component = ({
  field,
  fieldName,
  type,
  register,
  errors,
  defaultValue,
}: any) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={field}
        className="block mb-2 text-sm font-medium text-gray-900 dark1:text-white"
      >
        {fieldName || field}
      </label>
      <input
        defaultValue={defaultValue}
        type={type || "text"}
        id={field}
        placeholder={`${field}...`}
        {...register(field)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
      />
      {errors[field] && <span>This field is required</span>}
    </div>
  );
};

export default Component;
