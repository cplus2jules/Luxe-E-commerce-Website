'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

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

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
    <a href="#" className={styles.socialLink} aria-label={label}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d={d} />
        </svg>
    </a>
);

const LinkSection = ({ title, links, label }: { title: string; links: typeof footerLinks.shop; label: string }) => (
    <nav className={styles.linksSection} aria-label={label}>
        <h3 className={styles.linksTitle}>{title}</h3>
        <ul className={styles.linksList}>
            {links.map(link => (
                <li key={link.label}>
                    <Link href={link.href} className={styles.link}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo} aria-label="LUXE Store Home">
                            <span className={styles.logoText}>LUXE</span><span className={styles.logoAccent}>.</span>
                        </Link>
                        <p className={styles.tagline}>Premium products crafted for the modern lifestyle. Quality meets elegance.</p>
                        <div className={styles.social} aria-label="Social media links">
                            <SocialIcon d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" label="Follow us on Twitter" />
                            <SocialIcon d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" label="Follow us on Facebook" />
                        </div>
                    </div>
                    <LinkSection title="Shop" links={footerLinks.shop} label="Shop navigation" />
                    <LinkSection title="Support" links={footerLinks.support} label="Support navigation" />
                    <LinkSection title="Company" links={footerLinks.company} label="Company navigation" />
                </div>
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© {new Date().getFullYear()} LUXE. All rights reserved. Created by Julian Salas for IT 101</p>
                    <div className={styles.legal}>
                        <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
                        <Link href="#" className={styles.legalLink}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
