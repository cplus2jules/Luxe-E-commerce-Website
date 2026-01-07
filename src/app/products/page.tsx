'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import styles from './page.module.css';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || 'all';

    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);

    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter(
                (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
                break;
            case 'featured':
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return result;
    }, [selectedCategory, sortBy, priceRange]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>All Products</h1>
                    <p className={styles.subtitle}>
                        {filteredProducts.length} Items
                    </p>
                </div>

                <div className={styles.layout}>
                    {/* Sidebar - Classic Filters */}
                    <aside className={styles.sidebar}>
                        <div className={styles.filterSection}>
                            <h2 className={styles.filterTitle}>Category</h2>
                            <div className={styles.filterList}>
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        className={`${styles.filterLink} ${selectedCategory === category.slug ? styles.active : ''
                                            }`}
                                        onClick={() => setSelectedCategory(category.slug)}
                                    >
                                        {category.name} <span className={styles.count}>({category.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h2 className={styles.filterTitle}>Price</h2>
                            <div className={styles.priceRange}>
                                <div className={styles.priceInputs}>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className={styles.priceInput}
                                        placeholder="Min"
                                    />
                                    <span className={styles.dash}>—</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className={styles.priceInput}
                                        placeholder="Max"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="30000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className={styles.rangeSlider}
                                />
                            </div>
                        </div>

                        <button
                            className={styles.clearFilters}
                            onClick={() => {
                                setSelectedCategory('all');
                                setPriceRange([0, 25000]);
                            }}
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <div className={styles.main}>
                        {/* Toolbar - Minimal */}
                        <div className={styles.toolbar}>
                            <div className={styles.sortWrapper}>
                                <span className={styles.sortLabel}>Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className={styles.sortSelect}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest in</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className={styles.productGrid}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <div className={styles.noResults}>
                                    <p>No products found matching your criteria.</p>
                                    <button
                                        className={styles.resetButton}
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setPriceRange([0, 500]);
                                        }}
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductsLoading() {
    return <div className={styles.loading}>Loading catalog...</div>;
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsLoading />}>
            <ProductsContent />
        </Suspense>
    );
}
