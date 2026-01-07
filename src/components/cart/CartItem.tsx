'use client';

import Image from 'next/image';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';
import styles from './CartItem.module.css';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();
    const { product, quantity, selectedColor, selectedSize } = item;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            updateQuantity(product.id, newQuantity);
        }
    };

    return (
        <div className={styles.itemRow}>
            {/* Product Column */}
            <div className={styles.productCol}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                </div>
                <div className={styles.details}>
                    <h3 className={styles.name}>{product.name}</h3>
                    {(selectedColor || selectedSize) && (
                        <p className={styles.variant}>
                            {selectedColor && <span>{selectedColor}</span>}
                            {selectedColor && selectedSize && <span> / </span>}
                            {selectedSize && <span>{selectedSize}</span>}
                        </p>
                    )}
                    <button
                        onClick={() => removeItem(product.id)}
                        className={styles.removeLink}
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Price Column */}
            <div className={styles.priceCol}>
                ₱{product.price.toLocaleString()}
            </div>

            {/* Quantity Column */}
            <div className={styles.quantityCol}>
                <div className={styles.quantityControls}>
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className={styles.qtyBtn}
                    >
                        −
                    </button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 99}
                        className={styles.qtyBtn}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total Column */}
            <div className={styles.totalCol}>
                ₱{(product.price * quantity).toLocaleString()}
            </div>
        </div>
    );
}
