'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image?: string, location?: string) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        await prisma.post.create({
            data: {
                content,
                image: image || null,
                location: location || null,
                userId: session.user.id,
            }
        });
        revalidatePath('/community');
        return { success: true };
    } catch (error) {
        console.error("Create Post Error:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function toggleLike(postId: string) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const userId = session.user.id;

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            });
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId
                }
            });
        }

        revalidatePath('/community');
        return { success: true };
    } catch (error) {
        console.error("Toggle Like Error:", error);
        return { success: false, error: "Failed to toggle like" };
    }
}

export async function addComment(postId: string, content: string) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        await prisma.comment.create({
            data: {
                content,
                postId,
                userId: session.user.id,
            }
        });
        revalidatePath('/community');
        return { success: true };
    } catch (error) {
        console.error("Add Comment Error:", error);
        return { success: false, error: "Failed to add comment" };
    }
}
