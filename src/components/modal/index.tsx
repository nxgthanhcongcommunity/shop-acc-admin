import { Button } from "..";
import { CloseIcon } from "../../assets/icons";

const Component = ({
  modalName,
  toggle,
  setToggle,

  handleSubmit,
  children,
}: any) => {
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 max-h-full bg-[rgba(0,0,0,0.4)] ${toggle ? "flex" : "hidden"
        }`}
    >
      <div className="relative p-4 w-full max-w-[60%] max-h-full mt-[5vh]">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {modalName}
            </h3>
            <Button
              skin="transparent"
              onClick={() => setToggle((prev: any) => !prev)}
              data-modal-toggle="crud-modal"
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </Button>
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Component;
