import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, ProductSize, Order } from '@/types';

// --- CART STORE ---
interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, size?: ProductSize) => void;
    removeItem: (productId: number, size: ProductSize) => void;
    updateQuantity: (productId: number, size: ProductSize, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product, size = 'S') => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.id === product.id && item.size === size
                );

                let adjustedPrice = product.price;
                if (size === 'M') adjustedPrice += 6000;
                if (size === 'L') adjustedPrice += 10000;

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id && item.size === size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                ...product,
                                quantity: 1,
                                size,
                                price: adjustedPrice,
                                displayPrice: `${adjustedPrice.toLocaleString('vi-VN')}đ`
                            }
                        ],
                        isOpen: true,
                    });
                }
            },

            removeItem: (productId, size) => {
                set({
                    items: get().items.filter((item) => !(item.id === productId && item.size === size)),
                });
            },

            updateQuantity: (productId, size, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId, size);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === productId && item.size === size
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },

            toggleCart: () => set({ isOpen: !get().isOpen }),
            clearCart: () => set({ items: [] }),
            totalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        { name: 'highlands-cart-storage' }
    )
);

// --- ORDER STORE ---
interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],
            addOrder: (order) => set({ orders: [order, ...get().orders] }),
            updateOrderStatus: (orderId, status) => set({
                orders: get().orders.map(o => o.id === orderId ? { ...o, status } : o)
            })
        }),
        { name: 'highlands-order-storage' }
    )
);
