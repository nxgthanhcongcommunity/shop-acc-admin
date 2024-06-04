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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {fieldName || field}
      </label>
      <textarea
        defaultValue={defaultValue}
        id={field}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`${field}...`}
        {...register(field)}
      ></textarea>
      {errors[field] && <span>This field is required</span>}
    </>
  );
};

export default Component;
