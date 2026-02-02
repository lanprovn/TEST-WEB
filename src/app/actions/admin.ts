'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus }
        });

        // Refresh the admin page data
        revalidatePath('/admin');
        revalidatePath('/orders'); // Also refresh user's order history
        return { success: true };
    } catch (error) {
        console.error("Failed to update order:", error);
        return { success: false, error: "Failed to update status" };
    }
}
