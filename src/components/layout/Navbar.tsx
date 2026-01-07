'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/products?category=new', label: 'New Arrivals' },
    { href: '/cart', label: 'Cart' },
];

const Icon = ({ d }: { d: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d={d} />
    </svg>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const cartCount = useCart().getCartCount();

    useEffect(() => setIsOpen(false), [pathname]);

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? <Icon d="M18 6L6 18M6 6l12 12" /> : <Icon d="M3 12h18M3 6h18M3 18h18" />}
                </button>

                <nav className={styles.desktopMenu}>
                    {navLinks.slice(0, 2).map(link => (
                        <Link key={link.href} href={link.href} className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link href="/" className={styles.logo}>LUXE</Link>

                <div className={styles.actions}>
                    <nav className={styles.desktopMenu}>
                        {navLinks.slice(2).map(link => (
                            <Link key={link.href} href={link.href} className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <Link href="/cart" className={styles.iconButton} aria-label="Cart">
                        <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </Link>
                </div>

                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <nav className={styles.mobileNav}>
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className={styles.mobileLink}>{link.label}</Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
