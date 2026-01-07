'use client';

import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            icon,
            iconPosition = 'left',
            className = '',
            disabled,
            ...props // standard html props like type, form, onClick, etc.
        },
        ref
    ) => {
        const buttonClasses = [
            styles.button,
            styles[variant],
            styles[size],
            fullWidth ? styles.fullWidth : '',
            loading ? styles.loading : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <motion.button
                ref={ref}
                className={buttonClasses}
                disabled={disabled || loading}
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                {...props as HTMLMotionProps<"button">} // Cast to compatible motion props
            >
                {loading && (
                    <span className={styles.spinner} aria-hidden="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    </span>
                )}
                {!loading && icon && iconPosition === 'left' && (
                    <span className={styles.icon} aria-hidden="true">{icon}</span>
                )}
                <span className={styles.text}>{children}</span>
                {!loading && icon && iconPosition === 'right' && (
                    <span className={styles.icon} aria-hidden="true">{icon}</span>
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
