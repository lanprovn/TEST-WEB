'use client';

import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Tag, TrendingUp, Gift, Sparkles, Clock } from 'lucide-react';
import { useState } from 'react';

const PROMOTIONS = [
    {
        id: 1,
        title: "MUA 1 TẶNG 1 - HAPPY HOURS",
        desc: "Áp dụng khung giờ vàng 14h - 17h mỗi ngày tại các cửa hàng trên toàn quốc. Chỉ áp dụng cho các món Freeze và Trà.",
        img: "/gallery/hero-header.png",
        date: "02/02/2026",
        tag: "HOT",
        category: "flash-sale",
        discount: "50%",
        validUntil: "28/02/2026"
    },
    {
        id: 2,
        title: "RA MẮT BỘ SƯU TẬP TẾT 2026",
        desc: "Đón Tết rộn ràng với bộ sưu tập ly sứ và túi Canvas phiên bản giới hạn. Mua combo từ 2 sản phẩm giảm ngay 30%.",
        img: "/gallery/hero-bg.png",
        date: "01/02/2026",
        tag: "MỚI",
        category: "new-product",
        discount: "30%",
        validUntil: "15/02/2026"
    },
    {
        id: 3,
        title: "THÀNH VIÊN MỚI - ƯU ĐÃI NGẬP TRÀN",
        desc: "Tải App ngay để nhận voucher giảm 50% cho đơn hàng đầu tiên. Tích điểm đổi quà hấp dẫn mỗi ngày.",
        img: "/gallery/cta-two-bg.png",
        date: "28/01/2026",
        tag: "ƯU ĐÃI",
        category: "membership",
        discount: "50%",
        validUntil: "31/03/2026"
    },
    {
        id: 4,
        title: "COMBO SINH NHẬT - TIỆC TẤT NIÊN",
        desc: "Đặt combo tiệc từ 10 người trở lên giảm ngay 20%. Miễn phí trang trí và bánh kem sinh nhật.",
        img: "/gallery/hero-header.png",
        date: "25/01/2026",
        tag: "SỰ KIỆN",
        category: "event",
        discount: "20%",
        validUntil: "28/02/2026"
    },
    {
        id: 5,
        title: "FREESHIP 0Đ - ĐƠN TỪ 99K",
        desc: "Miễn phí giao hàng cho tất cả đơn hàng từ 99.000đ trong bán kính 5km. Áp dụng cả cuối tuần.",
        img: "/gallery/cta-two-bg.png",
        date: "20/01/2026",
        tag: "GIAO HÀNG",
        category: "delivery",
        discount: "0đ",
        validUntil: "31/12/2026"
    },
    {
        id: 6,
        title: "ĐIỂM TÍCH LŨY X2 - CUỐI TUẦN",
        desc: "Tích điểm gấp đôi cho mọi đơn hàng vào Thứ 7 và Chủ Nhật. Đổi quà ngay không cần chờ đợi.",
        img: "/gallery/hero-bg.png",
        date: "15/01/2026",
        tag: "TÍCH ĐIỂM",
        category: "loyalty",
        discount: "x2",
        validUntil: "Vô thời hạn"
    }
];

const CATEGORIES = [
    { id: 'all', label: 'Tất Cả', icon: Sparkles },
    { id: 'flash-sale', label: 'Flash Sale', icon: TrendingUp },
    { id: 'new-product', label: 'Sản Phẩm Mới', icon: Gift },
    { id: 'membership', label: 'Thành Viên', icon: Tag },
    { id: 'event', label: 'Sự Kiện', icon: Calendar },
];

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredPromotions = activeCategory === 'all'
        ? PROMOTIONS
        : PROMOTIONS.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            {/* HERO BANNER */}
            <div className="relative bg-gradient-to-br from-primary via-red-600 to-orange-500 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge className="bg-white/20 text-white border-none mb-4 px-4 py-1 text-sm backdrop-blur-sm">
                        <Sparkles className="w-3 h-3 mr-1 inline" /> Cập nhật mới nhất
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-widest mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Tin Tức & Khuyến Mãi
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        Cập nhật những ưu đãi nóng hổi nhất từ Highlands Coffee
                    </p>
                </div>
            </div>

            {/* CATEGORY FILTER */}
            <div className="bg-white border-b sticky top-20 z-40 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat.id
                                            ? 'bg-primary text-white shadow-lg shadow-red-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* PROMOTIONS GRID */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPromotions.map((item, idx) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border-none animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-black text-2xl px-4 py-2 rounded-full shadow-xl rotate-12 animate-pulse">
                                    -{item.discount}
                                </div>

                                {/* Tag */}
                                <Badge className="absolute top-4 left-4 bg-red-600 text-white border-none font-bold px-3 py-1">
                                    {item.tag}
                                </Badge>

                                {/* Date */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                </div>
                            </div>

                            <CardContent className="p-6 bg-white">
                                <h3 className="text-xl font-black uppercase mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                                    <Clock className="w-3 h-3 text-orange-500" />
                                    <span>Có hiệu lực đến: <strong className="text-gray-800">{item.validUntil}</strong></span>
                                </div>

                                <Button
                                    variant="outline"
                                    className="rounded-full w-full hover:bg-primary hover:text-white border-primary text-primary font-bold group-hover:shadow-lg transition-all"
                                >
                                    Xem Chi Tiết
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredPromotions.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Tag className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg">Chưa có chương trình khuyến mãi nào trong danh mục này.</p>
                    </div>
                )}
            </div>

            {/* CTA SECTION */}
            <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <Gift className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black uppercase mb-4">Đừng Bỏ Lỡ Ưu Đãi!</h2>
                    <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
                        Đăng ký nhận thông báo để không bỏ lỡ bất kỳ chương trình khuyến mãi nào từ Highlands Coffee
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 font-bold shadow-xl">
                            Đăng Ký Ngay
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 font-bold">
                            Tải App
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
