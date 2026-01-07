'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface Toast { id: string; message: string; type: ToastType; }

const ToastContext = createContext<{ showToast: (message: string, type?: ToastType) => void } | undefined>(undefined);

const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map(toast => (
                    <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                        <span className={styles.icon}>{icons[toast.type]}</span>
                        <span className={styles.message}>{toast.message}</span>
                        <button className={styles.close} onClick={() => removeToast(toast.id)} aria-label="Close">✕</button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
};
