'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
        showToast(`Added ${product.name} to cart`, 'success');
    };

    const discountPercentage = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <motion.article
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            <Link href={`/products/${product.id}`} className={styles.link} aria-label={`View ${product.name} details`}>
                <div className={styles.imageContainer}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={styles.image}
                    />

                    <div className={styles.badges}>
                        {product.new && <span className={styles.badgeNew}>New</span>}
                        {discountPercentage > 0 && (
                            <span className={styles.badgeSale}>-{discountPercentage}%</span>
                        )}
                    </div>

                    <motion.button
                        className={styles.quickAdd}
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add ${product.name} to cart`}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? (
                            <>
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
                                    aria-hidden="true"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add to Cart
                            </>
                        ) : (
                            'Out of Stock'
                        )}
                    </motion.button>

                    <div className={styles.overlay} aria-hidden="true" />
                </div>

                <div className={styles.content}>
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.name}>{product.name}</h3>

                    <div className={styles.rating} aria-label={`Rating: ${product.rating} out of 5 stars based on ${product.reviews} reviews`}>
                        <div className={styles.stars} aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                        <span className={styles.reviewCount}>({product.reviews})</span>
                    </div>

                    <div className={styles.priceContainer}>
                        <span className={styles.price}>₱{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>
                                ₱{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {product.colors && product.colors.length > 0 && (
                        <div className={styles.colors} aria-label={`Available colors: ${product.colors.map(c => c.name).join(', ')}`}>
                            {product.colors.slice(0, 4).map((color) => (
                                <span
                                    key={color.name}
                                    className={styles.colorDot}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                    aria-hidden="true"
                                />
                            ))}
                            {product.colors.length > 4 && (
                                <span className={styles.moreColors}>+{product.colors.length - 4}</span>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}
