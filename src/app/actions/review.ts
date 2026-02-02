'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitReview(productId: number, rating: number, comment: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, error: "Bạn cần đăng nhập để đánh giá" };
    }

    try {
        await prisma.review.create({
            data: {
                userId: session.user.id,
                productId: productId,
                rating: rating,
                comment: comment
            }
        });

        revalidatePath(`/product/${productId}`);
        return { success: true };
    } catch (error) {
        console.error("Submit Review Error:", error);
        return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại sau" };
    }
}
