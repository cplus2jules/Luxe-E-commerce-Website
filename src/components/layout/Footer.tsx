'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { href: '/products', label: 'All Products' },
            { href: '/products?category=electronics', label: 'Electronics' },
            { href: '/products?category=accessories', label: 'Accessories' },
            { href: '/products?category=bags', label: 'Bags' },
        ],
        support: [
            { href: '#', label: 'Contact Us' },
            { href: '#', label: 'FAQs' },
            { href: '#', label: 'Shipping Info' },
            { href: '#', label: 'Returns' },
        ],
        company: [
            { href: '#', label: 'About Us' },
            { href: '#', label: 'Careers' },
            { href: '#', label: 'Press' },
            { href: '#', label: 'Blog' },
        ],
    };

    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo} aria-label="LUXE Store Home">
                            <span className={styles.logoText}>LUXE</span>
                            <span className={styles.logoAccent}>.</span>
                        </Link>
                        <p className={styles.tagline}>
                            Premium products crafted for the modern lifestyle. Quality meets elegance.
                        </p>
                        <div className={styles.social} aria-label="Social media links">
                            <a href="#" className={styles.socialLink} aria-label="Follow us on Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Follow us on Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Follow us on Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <nav className={styles.linksSection} aria-label="Shop navigation">
                        <h3 className={styles.linksTitle}>Shop</h3>
                        <ul className={styles.linksList}>
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className={styles.linksSection} aria-label="Support navigation">
                        <h3 className={styles.linksTitle}>Support</h3>
                        <ul className={styles.linksList}>
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className={styles.linksSection} aria-label="Company navigation">
                        <h3 className={styles.linksTitle}>Company</h3>
                        <ul className={styles.linksList}>
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} LUXE. All rights reserved. Created by Julian Salas for IT 101
                    </p>
                    <div className={styles.legal}>
                        <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
                        <Link href="#" className={styles.legalLink}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
