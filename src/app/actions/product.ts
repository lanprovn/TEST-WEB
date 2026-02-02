'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    img: z.string().min(1, "Image URL is required"),
    tag: z.string().optional(),
    description: z.string().optional(),
});

export async function createProduct(formData: FormData) {
    const validatedFields = ProductSchema.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        price: formData.get('price'),
        img: formData.get('img'),
        tag: formData.get('tag'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors };
    }

    try {
        const { name, category, price, img, tag, description } = validatedFields.data;

        await prisma.product.create({
            data: {
                name,
                category,
                price,
                img,
                tag: tag || null,
                description: description || null,
                displayPrice: `${price.toLocaleString('vi-VN')}đ`,
            }
        });

        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Create product error:', error);
        return { success: false, error: 'Failed to create product' };
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete product' };
    }
}
