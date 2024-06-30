function Component({ field, fieldName, items, register }: any) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark1:text-white"
      >
        {fieldName || field}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
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
    </div>
  );
}

export default Component;
