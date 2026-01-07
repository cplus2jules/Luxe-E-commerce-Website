'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import styles from './ConfirmDialog.module.css';

const ConfirmDialogContext = createContext<{ confirm: (message: string, title?: string) => Promise<boolean> } | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Confirm');
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const confirm = (msg: string, ttl = 'Confirm'): Promise<boolean> => {
        setMessage(msg);
        setTitle(ttl);
        setIsOpen(true);
        return new Promise(resolve => setResolver(() => resolve));
    };

    const handleResponse = (value: boolean) => {
        resolver?.(value);
        setIsOpen(false);
    };

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            {isOpen && (
                <div className={styles.overlay} onClick={() => handleResponse(false)}>
                    <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.message}>{message}</p>
                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={() => handleResponse(false)}>Cancel</button>
                            <button className={styles.confirmBtn} onClick={() => handleResponse(true)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmDialogContext.Provider>
    );
}

export const useConfirm = () => {
    const ctx = useContext(ConfirmDialogContext);
    if (!ctx) throw new Error('useConfirm must be used within ConfirmDialogProvider');
    return ctx;
};
