import { ReactNode, useState } from 'react';
import { ToastContainer, ToastType } from './Toast';
import TabBarNav from './TabBarNav';

interface LayoutProps {
    children: ReactNode;
    showTabBar?: boolean;
}

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export default function Layout({ children, showTabBar = true }: LayoutProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pb-16">
                {children}
            </main>

            {showTabBar && <TabBarNav />}

            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
} 