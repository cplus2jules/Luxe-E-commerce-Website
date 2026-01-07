'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
    state: CartState;
    addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const idx = state.items.findIndex(
                i => i.product.id === action.payload.product.id &&
                    i.selectedColor === action.payload.selectedColor &&
                    i.selectedSize === action.payload.selectedSize
            );

            if (idx > -1) {
                const items = [...state.items];
                items[idx] = { ...items[idx], quantity: items[idx].quantity + action.payload.quantity };
                return { ...state, items };
            }
            return { ...state, items: [...state.items, action.payload] };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(i => i.product.id !== action.payload) };
        case 'UPDATE_QUANTITY':
            return action.payload.quantity <= 0
                ? { ...state, items: state.items.filter(i => i.product.id !== action.payload.id) }
                : { ...state, items: state.items.map(i => i.product.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i) };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'LOAD_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

    useEffect(() => {
        try {
            const saved = localStorage.getItem('cart');
            if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
        } catch (e) {
            console.error('Failed to load cart:', e);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.items));
    }, [state.items]);

    const value = {
        state,
        addItem: (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) =>
            dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedColor, selectedSize } }),
        removeItem: (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        updateQuantity: (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        getCartTotal: () => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
        getCartCount: () => state.items.reduce((sum, i) => sum + i.quantity, 0)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};