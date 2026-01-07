'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getNewProducts, categories } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className={styles.page}>
      {/* Hero Section - Editorial Style */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>Spring Collection 2026</span>
          <h1 className={styles.heroTitle}>Timeless Elegance</h1>
          <p className={styles.heroText}>
            Curated essentials for the modern lifestyle. Quality that speaks for itself.
          </p>
          <div className={styles.heroActions}>
            <Link href="/products">
              <Button size="lg" variant="primary">Shop Collection</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
            alt="Editorial fashion shot"
            fill
            className={styles.img}
            priority
          />
        </div>
      </section>

      {/* Categories - Minimal Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            {categories.slice(1).map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImage}>
                  {/* Placeholder patterns for categories since we don't have images in data */}
                  <div className={styles.categoryPlaceholder} />
                  <span className={styles.categoryNameOver}>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured - Classic Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Curated For You</h2>
            <Link href="/products" className={styles.viewAll}>
              View All Products
            </Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Split */}
      <section className={styles.editorial}>
        <div className={styles.editorialImage}>
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="Interior design"
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.editorialContent}>
          <h2 className={styles.editorialTitle}>The Art of Living</h2>
          <p className={styles.editorialText}>
            Discover products that bring harmony to your space. Our varied collection
            ensures you find exactly what reflects your personal taste.
          </p>
          <Link href="/products?category=accessories">
            <Button variant="outline">Explore Accessories</Button>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Just Arrived</h2>
          <div className={styles.productGrid}>
            {newProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
