'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button, Input } from '@/components/ui/FormElements';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { state, getCartTotal, clearCart } = useCart();
    const { items } = state;
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + tax + shipping;

    const [step, setStep] = useState<'details' | 'confirm'>('details');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            clearCart();
            setStep('confirm');
        }, 2000);
    };

    if (items.length === 0 && step !== 'confirm') {
        return (
            <div className={styles.empty}>
                <div className={styles.container}>
                    <h1>Your bag is empty</h1>
                    <Link href="/products"><Button>Return to Shop</Button></Link>
                </div>
            </div>
        );
    }

    if (step === 'confirm') {
        return (
            <div className={styles.confirmationPage}>
                <div className={styles.container}>
                    <div className={styles.confirmationCard}>
                        <div className={styles.checkIcon}>✓</div>
                        <h1 className={styles.confirmTitle}>Order Place Successfully</h1>
                        <p className={styles.confirmText}>Thank you for your purchase. We have sent an order confirmation email.</p>
                        <p className={styles.orderNumber}>Order #LUXE-{Math.floor(Math.random() * 10000)}</p>
                        <Link href="/"><Button size="lg">Continue Shopping</Button></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Checkout</h1>
                <div className={styles.layout}>
                    <div className={styles.formSection}>
                        <form onSubmit={handleSubmit} className={styles.form} id="checkout-form">
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Contact Information</h2>
                                <Input label="Email Address" type="email" placeholder="julian.salas@example.com" required />
                            </section>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Shipping Address</h2>
                                <div className={styles.row}>
                                    <Input label="First Name" placeholder="Julian" required />
                                    <Input label="Last Name" placeholder="Salas" required />
                                </div>
                                <Input label="Address" placeholder="Caraga State University, Ampayon" required />
                                <Input label="Apartment, suite, etc." placeholder="Hiraya Hall, CL1" />
                                <div className={styles.row3}>
                                    <Input label="City" placeholder="Butuan City" required />
                                    <Input label="Province" placeholder="Agusan del Norte" required />
                                    <Input label="ZIP" placeholder="8600" required />
                                </div>
                            </section>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Payment</h2>
                                <div className={styles.paymentPlaceholder}>Just pay with your smile! :)</div>
                            </section>
                        </form>
                    </div>
                    <div className={styles.summarySection}>
                        <div className={styles.summaryCard}>
                            <h2 className={styles.summaryTitle}>Your Order</h2>
                            <div className={styles.itemsList}>
                                {items.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedSize}`} className={styles.summaryItem}>
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.product.name}</span>
                                            <span className={styles.itemVariiant}>Qty: {item.quantity} | Size: {item.selectedSize || 'N/A'}</span>
                                        </div>
                                        <span className={styles.itemPrice}>₱{(item.product.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.totals}>
                                <div className={styles.row}><span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span></div>
                                <div className={styles.row}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`}</span></div>
                                <div className={styles.row}><span>Tax</span><span>₱{tax.toLocaleString()}</span></div>
                                <div className={styles.totalRow}><span>Total</span><span>₱{total.toLocaleString()}</span></div>
                            </div>
                            <Button type="submit" form="checkout-form" fullWidth size="lg" loading={loading}>Place Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
