const Component = ({
  field,
  fieldName,
  type,
  register,
  errors,
  defaultValue,
}: any) => {
  return (
    <>
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
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500 dark1:shadow-sm-light"
      />
      {errors[field] && <span>This field is required</span>}
    </>
  );
};

export default Component;
