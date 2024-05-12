type Props = {};

const Button = ({ skin, type, onClick, children, ...restProps }: any) => {
  let buttonColorClass;
  switch (skin) {
    case "default":
      buttonColorClass =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12 px-6";
      break;
    case "transparent":
      buttonColorClass =
        "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white";
      break;
    case "danger":
      buttonColorClass =
        "text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 h-12 px-6";
      break;
    case "alter":
      buttonColorClass =
        "h-12 px-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
      break;
  }
  return (
    <button
      {...restProps}
      className={buttonColorClass}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

/*

*/
