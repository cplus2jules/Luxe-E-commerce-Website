'use client';

import Image from 'next/image';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './CartItem.module.css';

export default function CartItem({ item }: { item: CartItemType }) {
    const { updateQuantity, removeItem } = useCart();
    const { showToast } = useToast();
    const { product, quantity, selectedColor, selectedSize } = item;

    const handleQtyChange = (newQty: number) => newQty >= 1 && newQty <= 99 && updateQuantity(product.id, newQty);
    const handleRemove = () => {
        removeItem(product.id);
        showToast(`Removed ${product.name} from cart`, 'info');
    };

    const variant = [selectedColor, selectedSize].filter(Boolean).join(' / ');

    return (
        <div className={styles.itemRow}>
            <div className={styles.productCol}>
                <div className={styles.imageWrapper}>
                    <Image src={product.image} alt={product.name} fill className={styles.image} />
                </div>
                <div className={styles.details}>
                    <h3 className={styles.name}>{product.name}</h3>
                    {variant && <p className={styles.variant}>{variant}</p>}
                    <button onClick={handleRemove} className={styles.removeLink}>Remove</button>
                </div>
            </div>
            <div className={styles.priceCol}>₱{product.price.toLocaleString()}</div>
            <div className={styles.quantityCol}>
                <div className={styles.quantityControls}>
                    <button onClick={() => handleQtyChange(quantity - 1)} disabled={quantity <= 1} className={styles.qtyBtn}>−</button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button onClick={() => handleQtyChange(quantity + 1)} disabled={quantity >= 99} className={styles.qtyBtn}>+</button>
                </div>
            </div>
            <div className={styles.totalCol}>₱{(product.price * quantity).toLocaleString()}</div>
        </div>
    );
}
