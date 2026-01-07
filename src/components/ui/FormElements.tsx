'use client';

import { forwardRef, ReactNode, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styles from './FormElements.module.css';

// ============================================
// BUTTON COMPONENT
// ============================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', fullWidth, loading, icon, iconPosition = 'left', className = '', disabled, ...props }, ref) => {
        const classes = [styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, loading && styles.loading, className].filter(Boolean).join(' ');

        return (
            <motion.button
                ref={ref}
                className={classes}
                disabled={disabled || loading}
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                {...props as any}
            >
                {loading && (
                    <span className={styles.spinner} aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    </span>
                )}
                {!loading && icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
                <span className={styles.text}>{children}</span>
                {!loading && icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';

// ============================================
// INPUT COMPONENT
// ============================================
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, className = '', id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const describedBy = [error && `${inputId}-error`, hint && `${inputId}-hint`].filter(Boolean).join(' ') || undefined;

        return (
            <div className={styles.inputWrapper}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}{props.required && <span className={styles.required}>*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={describedBy}
                    {...props}
                />
                {hint && !error && <p id={`${inputId}-hint`} className={styles.hint}>{hint}</p>}
                {error && (
                    <p id={`${inputId}-error`} className={styles.error} role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

// Default export for backward compatibility
export default Button;
