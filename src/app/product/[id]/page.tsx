
import { notFound } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailContent } from "@/components/product/ProductDetailContent";
import { prisma } from "@/lib/db";
import { Product, Review } from '@/types';
import { ProductCard } from "@/components/product/ProductCard";

// Force dynamic rendering if we want to ensure latest data
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15: params is a Promise
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
        return notFound();
    }

    const productData = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            reviews: {
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, image: true } } }
            }
        }
    });

    if (!productData) {
        return notFound();
    }

    // Get Related Products (Same category, excluding current)
    const relatedProductsData = await prisma.product.findMany({
        where: {
            category: productData.category,
            NOT: { id: productId }
        },
        take: 4
    });

    // Adapt Prisma result to UI Types
    const product: Product = {
        id: productData.id,
        category: productData.category,
        name: productData.name,
        price: productData.price,
        displayPrice: productData.displayPrice,
        img: productData.img,
        tag: productData.tag,
        description: productData.description
    };

    // Transform Reviews to match type
    const reviews: Review[] = productData.reviews.map(r => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt.toISOString(),
        user: {
            name: r.user.name,
            image: r.user.image
        }
    }));

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />
            <ProductDetailContent product={product} reviews={reviews} />

            {/* RELATED PRODUCTS */}
            {relatedProductsData.length > 0 && (
                <section className="container mx-auto px-4 pb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <h3 className="text-2xl font-bold uppercase text-gray-800">Có thể bạn sẽ thích</h3>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProductsData.map((prod) => (
                            <ProductCard key={prod.id} product={prod as unknown as Product} />
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
