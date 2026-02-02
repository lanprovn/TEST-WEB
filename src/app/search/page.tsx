
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { Search, Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    if (!q) {
        return (
            <main className="min-h-screen bg-[#fcfbf8]">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <p>Vui lòng nhập từ khóa tìm kiếm.</p>
                </div>
                <Footer />
            </main>
        );
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: q } },
                { description: { contains: q } },
                { category: { contains: q } }
            ]
        }
    });

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        <Search className="w-6 h-6 text-primary" />
                        Kết quả tìm kiếm cho: <span className="text-primary">"{q}"</span>
                    </h1>
                    <p className="text-gray-500">Tìm thấy {products.length} sản phẩm phù hợp.</p>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Frown className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-700">Không tìm thấy sản phẩm nào</h2>
                        <p className="text-gray-500 mb-6">Thử tìm kiếm với từ khóa khác xem sao?</p>
                        <Link href="/">
                            <Button variant="outline" className="rounded-full">Về trang chủ</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
