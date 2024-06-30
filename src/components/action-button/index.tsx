interface IActionButtonProps {
  side: "left" | "mid" | "right";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ActionButton: React.FC<IActionButtonProps> = (props) => {
  const { side, onClick, children, disabled, ...restProps } = props;

  switch (side) {
    case "left":
      return (
        <button
          disabled={disabled}
          {...restProps}
          onClick={onClick}
          type="button"
          className="cursor-pointer px-3 py-[6px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
        >
          {children}
        </button>
      );
    case "mid":
      return (
        <button
          disabled={disabled}
          {...restProps}
          onClick={onClick}
          type="button"
          className="cursor-pointer px-3 py-[6px] text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          {children}
        </button>
      );
    case "right":
      return (
        <button
          disabled={disabled}
          {...restProps}
          onClick={onClick}
          type="button"
          className="cursor-pointer px-3 py-[6px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          {children}
        </button>
      );
  }
};

export default ActionButton;
