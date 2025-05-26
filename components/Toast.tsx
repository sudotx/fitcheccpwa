import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export default function Toast({
    message,
    type,
    duration = 3000,
    onClose,
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const Icon = icons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
        >
            <div
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${colors[type]} shadow-lg`}
            >
                <Icon size={20} />
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
}

// Toast Container to manage multiple toasts
interface ToastContainerProps {
    toasts: Array<{
        id: string;
        message: string;
        type: ToastType;
    }>;
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </div>
    );
} 