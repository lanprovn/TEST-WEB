'use client';

import Link from 'next/link';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-4xl font-black text-gray-800 mb-4">Đặt Hàng Thành Công!</h1>
                <p className="text-xl text-gray-600 max-w-lg mb-8">
                    Cảm ơn bạn đã đặt hàng tại Highlands Coffee. Barista đang bắt đầu pha chế đồ uống cho bạn ngay lập tức!
                </p>

                <div className="flex gap-4">
                    <Link href="/">
                        <Button className="rounded-full bg-gray-900 hover:bg-black px-8 h-12">
                            <Home className="w-4 h-4 mr-2" /> Về Trang Chủ
                        </Button>
                    </Link>
                    <Button variant="outline" className="rounded-full px-8 h-12 border-gray-300">
                        Xem Đơn Hàng
                    </Button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
