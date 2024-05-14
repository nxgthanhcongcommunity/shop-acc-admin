import { useState } from "react";

const TabTitle = ({ title, icon, isActived, onClick }: any) => {
    const normalTabClass =
        "cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
    const activedTabClass =
        "cursor-pointer inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group";

    return (
        <div className="me-2" onClick={onClick}>
            <span
                className={isActived ? activedTabClass : normalTabClass}
                aria-current="page"
            >
                {icon && icon(isActived)}
                {title}
            </span>
        </div>
    );
};

const Tab = ({ tabs, contents }: any) => {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };

    return (
        <div>
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {
                    tabs.map(({ title, icon }: any, index: number) => (
                        <TabTitle
                            key={title}
                            title={title}
                            icon={icon}
                            isActived={index === activeTab}
                            onClick={() => handleTabClick(index)}
                        />
                    ))
                }
            </ul>
            <ul>
                <li>{contents[activeTab]}</li>
            </ul>
        </div>
    )
}

export default Tab;