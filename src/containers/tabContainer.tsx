import { ReactNode } from "react";

interface ITabContainerProps {
    children: ReactNode;
}

const TabContainer = ({ children }: ITabContainerProps) => {
    return (
        <div className="shadow-md p-6">
            {children}
        </div>
    )
};

export default TabContainer;