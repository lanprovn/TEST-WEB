
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminProductList } from "@/components/admin/AdminProductList";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-gray-50/50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <Link href="/admin" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại Dashboard
                </Link>

                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wide mb-8">Quản Lý Thực Đơn</h1>

                <AdminProductList products={products} />
            </div>

            <Footer />
        </main>
    );
}
