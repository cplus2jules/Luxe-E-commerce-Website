'use client';

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
export default Button;
