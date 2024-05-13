function Component({ field, fieldName, items, register }: any) {
  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {fieldName || field}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(field)}
      >
        <option value="">Chọn...</option>
        {items &&
          items.map(({ value, name }: any) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
}

export default Component;
