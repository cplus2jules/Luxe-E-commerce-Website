export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    tags: string[];
    featured?: boolean;
    new?: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions.",
        price: 15999,
        originalPrice: 19999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80"
        ],
        category: "Electronics",
        rating: 4.8,
        reviews: 2847,
        inStock: true,
        colors: [
            { name: "Midnight Black", hex: "#1a1a1a" },
            { name: "Pearl White", hex: "#f5f5f5" },
            { name: "Navy Blue", hex: "#1e3a5f" }
        ],
        tags: ["wireless", "noise-cancelling", "premium"],
        featured: true,
        new: true
    },
    {
        id: "2",
        name: "Minimalist Watch",
        description: "Elegant minimalist timepiece crafted with precision. Features a Swiss movement, sapphire crystal glass, and genuine Italian leather strap.",
        price: 12500,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80"
        ],
        category: "Accessories",
        rating: 4.9,
        reviews: 1523,
        inStock: true,
        colors: [
            { name: "Silver", hex: "#c0c0c0" },
            { name: "Rose Gold", hex: "#b76e79" },
            { name: "Black", hex: "#1a1a1a" }
        ],
        tags: ["luxury", "minimalist", "swiss"],
        featured: true
    },
    {
        id: "3",
        name: "Smart Fitness Tracker",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, sleep analysis, and 7-day battery life.",
        price: 8999,
        originalPrice: 11499,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
            "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=800&q=80"
        ],
        category: "Electronics",
        rating: 4.6,
        reviews: 3241,
        inStock: true,
        sizes: ["Small", "Medium", "Large"],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Blue", hex: "#3b82f6" },
            { name: "Pink", hex: "#ec4899" }
        ],
        tags: ["fitness", "smart", "health"],
        new: true
    },
    {
        id: "4",
        name: "Premium Leather Backpack",
        description: "Handcrafted from full-grain leather, this backpack combines timeless style with modern functionality. Features padded laptop compartment and multiple pockets.",
        price: 17500,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
        ],
        category: "Bags",
        rating: 4.7,
        reviews: 892,
        inStock: true,
        colors: [
            { name: "Cognac", hex: "#8b4513" },
            { name: "Black", hex: "#1a1a1a" }
        ],
        tags: ["leather", "premium", "laptop"],
        featured: true
    },
    {
        id: "5",
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for all Qi-enabled devices. Sleek aluminum design with LED indicator and built-in safety features.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800&q=80"],
        category: "Electronics",
        rating: 4.5,
        reviews: 1876,
        inStock: true,
        colors: [
            { name: "Space Gray", hex: "#52525b" },
            { name: "White", hex: "#fafafa" }
        ],
        tags: ["wireless", "charging", "fast"]
    },
    {
        id: "6",
        name: "Designer Sunglasses",
        description: "Iconic aviator design with polarized lenses and titanium frame. UV400 protection ensures complete eye safety.",
        price: 9500,
        originalPrice: 12500,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
        ],
        category: "Accessories",
        rating: 4.8,
        reviews: 654,
        inStock: true,
        colors: [
            { name: "Gold", hex: "#ffd700" },
            { name: "Silver", hex: "#c0c0c0" },
            { name: "Gunmetal", hex: "#52525b" }
        ],
        tags: ["polarized", "designer", "uv-protection"],
        featured: true
    },
    {
        id: "7",
        name: "Portable Bluetooth Speaker",
        description: "Powerful 360° sound in a compact, waterproof design. Features 24-hour battery life and multi-speaker pairing capability.",
        price: 6499,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"],
        category: "Electronics",
        rating: 4.6,
        reviews: 2103,
        inStock: true,
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Blue", hex: "#3b82f6" },
            { name: "Red", hex: "#ef4444" }
        ],
        tags: ["bluetooth", "waterproof", "portable"],
        new: true
    },
    {
        id: "8",
        name: "Canvas Tote Bag",
        description: "Sustainable canvas tote made from organic cotton. Spacious interior with inner pocket and reinforced handles.",
        price: 2250,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"],
        category: "Bags",
        rating: 4.4,
        reviews: 432,
        inStock: true,
        colors: [
            { name: "Natural", hex: "#d4c5a9" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Navy", hex: "#1e3a5f" }
        ],
        tags: ["sustainable", "organic", "everyday"]
    },
    {
        id: "9",
        name: "Mechanical Keyboard",
        description: "Premium mechanical keyboard with hot-swappable switches, RGB backlighting, and aircraft-grade aluminum frame.",
        price: 9999,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
        ],
        category: "Electronics",
        rating: 4.9,
        reviews: 1567,
        inStock: true,
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "White", hex: "#fafafa" }
        ],
        tags: ["mechanical", "rgb", "gaming"],
        featured: true
    },
    {
        id: "10",
        name: "Leather Wallet",
        description: "Slim bifold wallet crafted from premium Italian leather. Features RFID blocking technology and multiple card slots.",
        price: 4450,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"],
        category: "Accessories",
        rating: 4.7,
        reviews: 789,
        inStock: true,
        colors: [
            { name: "Brown", hex: "#8b4513" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Tan", hex: "#d2b48c" }
        ],
        tags: ["leather", "rfid", "slim"]
    },
    {
        id: "11",
        name: "Wireless Earbuds Pro",
        description: "True wireless earbuds with adaptive noise cancellation and spatial audio. IPX5 water resistance and wireless charging case.",
        price: 9999,
        originalPrice: 12499,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"],
        category: "Electronics",
        rating: 4.7,
        reviews: 4521,
        inStock: true,
        colors: [
            { name: "White", hex: "#fafafa" },
            { name: "Black", hex: "#1a1a1a" }
        ],
        tags: ["wireless", "noise-cancelling", "earbuds"],
        new: true
    },
    {
        id: "12",
        name: "Laptop Sleeve",
        description: "Premium neoprene laptop sleeve with soft fleece lining. Fits laptops up to 15 inches with water-resistant exterior.",
        price: 1999,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80"],
        category: "Bags",
        rating: 4.5,
        reviews: 567,
        inStock: false,
        colors: [
            { name: "Charcoal", hex: "#36454f" },
            { name: "Navy", hex: "#1e3a5f" }
        ],
        tags: ["laptop", "protective", "slim"]
    }
];

export const categories = [
    { name: "All", slug: "all", count: products.length },
    { name: "Electronics", slug: "electronics", count: products.filter(p => p.category === "Electronics").length },
    { name: "Accessories", slug: "accessories", count: products.filter(p => p.category === "Accessories").length },
    { name: "Bags", slug: "bags", count: products.filter(p => p.category === "Bags").length },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: string) =>
    category === "all" ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewProducts = () => products.filter(p => p.new);
