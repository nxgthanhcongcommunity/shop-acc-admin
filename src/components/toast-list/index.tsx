import { useEffect } from "react";
import { TOASTMSG_TYPES } from "../../constants";
import { IToastMessage, useToast } from "../../providers/toastProvider";

const ToastItem = (props: IToastMessage) => {
  const { type, title, content } = props;

  const getToastConfig = (type: string) => {
    switch (type) {
      case TOASTMSG_TYPES.SUCCESS:
        return {
          icon: (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg  ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Success icon</span>
            </div>
          ),
        };

      case TOASTMSG_TYPES.ERROR:
        return {
          icon: (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg  ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
          ),
        };

      case TOASTMSG_TYPES.WARNING:
        return {
          icon: (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg  ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
          ),
        };

      case TOASTMSG_TYPES.INFOR:
        return {
          icon: (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg  ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Info icon</span>
            </div>
          ),
        };

      default:
        return null;
    }
  };

  const config = getToastConfig(type);

  if (config == null) return <>...</>;

  return (
    <div
      className="flex items-center w-[360px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      {config.icon}
      <div>
        <span className="ms-3 mb-1 text-sm font-semibold text-gray-900">
          {title}
        </span>
        <div className="ms-3 text-sm font-normal">{content}</div>
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

const ToastList = () => {
  const { toastMessages, removeToastMessage } = useToast();

  useEffect(() => {
    const timers = toastMessages.map((msg) =>
      setTimeout(() => removeToastMessage(msg), 3000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toastMessages, removeToastMessage]);

  return (
    <div className="fixed right-4 z-[100] top-[120px]">
      {toastMessages.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          content={toast.content}
        />
      ))}
    </div>
  );
};

export default ToastList;
