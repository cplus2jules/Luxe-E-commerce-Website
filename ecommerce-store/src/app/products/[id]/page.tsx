'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const product = getProductById(params.id as string);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        product?.sizes?.[0]
    );
    const [quantity, setQuantity] = useState(1);

    const { addItem } = useCart();
    const { showToast } = useToast();

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        addItem(product, quantity, undefined, selectedSize);
        showToast(`Added ${quantity} ${product.name} to cart`, 'success');
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Image Gallery */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImageWrapper}>
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className={styles.mainImage}
                                priority
                            />
                        </div>
                        <div className={styles.thumbnails}>
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`${styles.thumbnail} ${selectedImage === idx ? styles.active : ''}`}
                                    onClick={() => setSelectedImage(idx)}
                                >
                                    <Image src={img} alt="" fill className={styles.thumbImg} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={styles.info}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.title}>{product.name}</h1>
                        <div className={styles.priceRow}>
                            <span className={styles.price}>₱{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className={styles.originalPrice}>₱{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.divider} />

                        {product.sizes && (
                            <div className={styles.selectorRow}>
                                <span className={styles.label}>Size:</span>
                                <div className={styles.options}>
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`${styles.optionBtn} ${selectedSize === size ? styles.selected : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.actions}>
                            <Button size="lg" fullWidth onClick={handleAddToCart}>
                                Add to Bag
                            </Button>
                        </div>

                        <div className={styles.detailsList}>
                            <details open>
                                <summary>Description</summary>
                                <p>
                                    Experience luxury with our premium {product.name.toLowerCase()}.
                                    Crafted with attention to detail and high-quality materials.
                                </p>
                            </details>
                            <details>
                                <summary>Shipping & Returns</summary>
                                <p>Free standard shipping on all orders. 30-day return policy.</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
