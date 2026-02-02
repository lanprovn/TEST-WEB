'use server';

import { prisma } from "@/lib/db";
import { CartItem } from "@/types";
import { auth } from "@/auth";

interface CheckoutData {
    customer: {
        name: string;
        phone: string;
        address: string;
        note: string;
    };
    items: CartItem[];
    total: number;
    paymentMethod: string;
}

export async function createOrder(data: CheckoutData) {
    const session = await auth();

    // Basic validation
    if (!data.items || data.items.length === 0) {
        throw new Error("Cart is empty");
    }

    // Create Order in DB
    const order = await prisma.order.create({
        data: {
            date: new Date(),
            customerName: data.customer.name,
            customerPhone: data.customer.phone,
            customerAddr: data.customer.address,
            customerNote: data.customer.note,
            total: data.total,
            status: 'pending',
            paymentMethod: data.paymentMethod,
            // If user is logged in, link it. Otherwise leave null (Guest)
            userId: session?.user?.id ? session.user.id : undefined,
            items: {
                create: data.items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    size: item.size,
                    price: item.price
                }))
            }
        }
    });

    return { success: true, orderId: order.id };
}
