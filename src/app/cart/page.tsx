'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useConfirm, useToast } from '@/context/FeedbackContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/FormElements';
import styles from './page.module.css';

export default function CartPage() {
    const { state, clearCart, getCartTotal } = useCart();
    const { items } = state;
    const { confirm } = useConfirm();
    const { showToast } = useToast();

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + tax + shipping;

    const handleClearCart = async () => {
        const confirmed = await confirm('Are you sure you want to clear your shopping bag? This action cannot be undone.', 'Clear Shopping Bag');
        if (confirmed) {
            clearCart();
            showToast('Shopping bag cleared', 'info');
        }
    };

    if (items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Your Shopping Bag</h1>
                    <p className={styles.emptyText}>Your bag is currently empty.</p>
                    <div className={styles.emptyActions}>
                        <Link href="/products"><Button size="lg">Continue Shopping</Button></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Shopping Bag</h1>
                <div className={styles.layout}>
                    <div className={styles.itemsSection}>
                        <div className={styles.tableHeader}>
                            <span className={styles.headerItem}>Product</span>
                            <span className={styles.headerPrice}>Price</span>
                            <span className={styles.headerQuantity}>Quantity</span>
                            <span className={styles.headerTotal}>Total</span>
                        </div>
                        <div className={styles.itemsList}>
                            {items.map((item) => (
                                <CartItem key={`${item.product.id}-${item.selectedSize}`} item={item} />
                            ))}
                        </div>
                        <div className={styles.cartActions}>
                            <button onClick={handleClearCart} className={styles.clearButton}>Clear Shopping Bag</button>
                        </div>
                    </div>
                    <div className={styles.summarySection}>
                        <div className={styles.summaryCard}>
                            <h2 className={styles.summaryTitle}>Order Summary</h2>
                            <div className={styles.summaryRow}><span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span></div>
                            <div className={styles.summaryRow}><span>Estimated Tax</span><span>₱{tax.toLocaleString()}</span></div>
                            <div className={styles.summaryRow}><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`}</span></div>
                            <div className={styles.divider} />
                            <div className={styles.totalRow}><span>Total</span><span>₱{total.toLocaleString()}</span></div>
                            <div className={styles.checkoutActions}>
                                <Link href="/checkout" style={{ width: '100%' }}><Button fullWidth size="lg">Proceed to Checkout</Button></Link>
                                <Link href="/products" className={styles.continueLink}>Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
