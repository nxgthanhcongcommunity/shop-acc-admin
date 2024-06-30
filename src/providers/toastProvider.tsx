import { createContext, useContext, useState } from "react";

export interface IToastMessage {
    id: string;
    type: string;
    title: string;
    content: string;
}

interface IToastContextType {
    toastMessages: IToastMessage[],
    addToastMessage: (message: IToastMessage) => void,
    removeToastMessage: (message: IToastMessage) => void,
}

const ToastContext = createContext<IToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: any) => {

    const [toastMessages, setToastMessages] = useState<IToastMessage[]>([]);

    const addToastMessage = (message: IToastMessage) => {
        setToastMessages(prev => [
            message,
            ...prev,
        ])
    }

    const removeToastMessage = (message: IToastMessage) => {
        setToastMessages(prev => prev.filter(item => item.id !== message.id));
    }

    return (
        <ToastContext.Provider value={{
            toastMessages: toastMessages,
            addToastMessage: addToastMessage,
            removeToastMessage: removeToastMessage,
        }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context == null) {
        throw new Error("useToast must have ToastContext");
    }

    return context;
}

export default ToastProvider;