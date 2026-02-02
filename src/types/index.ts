export interface Category {
    id: string;
    label: string;
}

export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date | string;
    user: {
        name: string | null;
        image: string | null;
    };
}

export interface Product {
    id: number;
    category: string;
    name: string;
    price: number;
    displayPrice?: string | null;
    img: string;
    tag?: string | null;
    description?: string | null;
    reviews?: Review[];
}

export type ProductSize = 'S' | 'M' | 'L';

export interface CartItem extends Product {
    quantity: number;
    size: ProductSize;
    price: number; // Ensure price is explicit
}

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';

export interface Order {
    id: string; // uuid
    date: string; // ISO date
    customer: {
        name: string;
        phone: string;
        address: string;
        note?: string;
    };
    items: CartItem[];
    total: number;
    status: OrderStatus;
    paymentMethod: 'cod' | 'banking';
}
