'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import styles from './Feedback.module.css';

// Toast Types & Context
type ToastType = 'success' | 'error' | 'info' | 'warning';
interface Toast { id: string; message: string; type: ToastType; }
const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

interface FeedbackContextType {
    showToast: (message: string, type?: ToastType) => void;
    confirm: (message: string, title?: string) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
    // Toast State
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('Confirm');
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    const confirm = (msg: string, ttl = 'Confirm'): Promise<boolean> => {
        setDialogMessage(msg);
        setDialogTitle(ttl);
        setDialogOpen(true);
        return new Promise(resolve => setResolver(() => resolve));
    };

    const handleResponse = (value: boolean) => {
        resolver?.(value);
        setDialogOpen(false);
    };

    return (
        <FeedbackContext.Provider value={{ showToast, confirm }}>
            {children}

            {/* Toast Container */}
            <div className={styles.toastContainer}>
                {toasts.map(toast => (
                    <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                        <span className={styles.toastIcon}>{icons[toast.type]}</span>
                        <span className={styles.toastMessage}>{toast.message}</span>
                        <button className={styles.toastClose} onClick={() => removeToast(toast.id)} aria-label="Close">✕</button>
                    </div>
                ))}
            </div>

            {/* Confirm Dialog */}
            {dialogOpen && (
                <div className={styles.dialogOverlay} onClick={() => handleResponse(false)}>
                    <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                        <h2 className={styles.dialogTitle}>{dialogTitle}</h2>
                        <p className={styles.dialogMessage}>{dialogMessage}</p>
                        <div className={styles.dialogActions}>
                            <button className={styles.cancelBtn} onClick={() => handleResponse(false)}>Cancel</button>
                            <button className={styles.confirmBtn} onClick={() => handleResponse(true)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </FeedbackContext.Provider>
    );
}

export const useToast = () => {
    const ctx = useContext(FeedbackContext);
    if (!ctx) throw new Error('useToast must be used within FeedbackProvider');
    return { showToast: ctx.showToast };
};

export const useConfirm = () => {
    const ctx = useContext(FeedbackContext);
    if (!ctx) throw new Error('useConfirm must be used within FeedbackProvider');
    return { confirm: ctx.confirm };
};
