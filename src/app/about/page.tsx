'use client';

import Image from 'next/image';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Coffee,
    Users,
    Award,
    TrendingUp,
    Heart,
    Globe,
    Target,
    Sparkles,
    MapPin,
    Clock,
    Shield,
    Leaf
} from 'lucide-react';

const STATS = [
    { icon: MapPin, value: '500+', label: 'Cửa Hàng', color: 'text-red-600' },
    { icon: Users, value: '10M+', label: 'Khách Hàng', color: 'text-blue-600' },
    { icon: Coffee, value: '50M+', label: 'Ly Cà Phê/Năm', color: 'text-orange-600' },
    { icon: Award, value: '25+', label: 'Giải Thưởng', color: 'text-yellow-600' },
];

const VALUES = [
    {
        icon: Heart,
        title: 'Đam Mê',
        description: 'Chúng tôi yêu cà phê và tận tâm với từng sản phẩm mang đến cho khách hàng.',
        color: 'bg-red-50 text-red-600'
    },
    {
        icon: Shield,
        title: 'Chất Lượng',
        description: 'Cam kết 100% nguyên liệu tươi ngon, quy trình sản xuất nghiêm ngặt.',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        icon: Leaf,
        title: 'Bền Vững',
        description: 'Hợp tác với nông dân địa phương, bảo vệ môi trường và phát triển cộng đồng.',
        color: 'bg-green-50 text-green-600'
    },
    {
        icon: Sparkles,
        title: 'Đổi Mới',
        description: 'Không ngừng sáng tạo, mang đến trải nghiệm cà phê hiện đại và độc đáo.',
        color: 'bg-purple-50 text-purple-600'
    },
];

const TIMELINE = [
    { year: '2000', event: 'Thành lập tại Hà Nội', desc: 'Cửa hàng đầu tiên mở tại phố cổ Hà Nội' },
    { year: '2005', event: 'Mở rộng toàn quốc', desc: 'Có mặt tại 10 tỉnh thành lớn' },
    { year: '2010', event: 'Đạt 100 cửa hàng', desc: 'Trở thành chuỗi cà phê hàng đầu Việt Nam' },
    { year: '2015', event: 'Ra mắt ứng dụng', desc: 'Tiên phong trong đặt hàng online' },
    { year: '2020', event: 'Mở rộng quốc tế', desc: 'Khai trương cửa hàng đầu tiên tại Singapore' },
    { year: '2024', event: 'Đạt 500+ cửa hàng', desc: 'Phục vụ hơn 10 triệu khách hàng mỗi năm' },
];

const TEAM = [
    { name: 'Nguyễn Văn A', role: 'CEO & Founder', image: '/gallery/hero-header.png' },
    { name: 'Trần Thị B', role: 'Head of Operations', image: '/gallery/cta-two-bg.png' },
    { name: 'Lê Văn C', role: 'Master Barista', image: '/gallery/hero-bg.png' },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* HERO SECTION */}
            <div className="relative h-[500px] overflow-hidden">
                <Image
                    src="/gallery/hero-bg.png"
                    alt="About Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-left duration-700">
                            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1">
                                <Sparkles className="w-3 h-3 mr-1" /> Câu chuyện của chúng tôi
                            </Badge>
                            <h1 className="text-6xl font-black uppercase tracking-tight leading-tight">
                                Về Highlands Coffee
                            </h1>
                            <p className="text-xl text-gray-200 leading-relaxed">
                                Hành trình 25 năm lan tỏa hương vị cà phê Việt Nam đến mọi miền đất nước và thế giới.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-bold shadow-xl">
                                    Tìm Hiểu Thêm
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 font-bold backdrop-blur-sm">
                                    Liên Hệ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS SECTION */}
            <div className="bg-white py-16 border-y">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, idx) => (
                            <div
                                key={idx}
                                className="text-center space-y-3 animate-in fade-in slide-in-from-bottom duration-700"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center ${stat.color}`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STORY SECTION */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                            <Coffee className="w-3 h-3 mr-1" /> Câu Chuyện Thương Hiệu
                        </Badge>
                        <h2 className="text-4xl font-black uppercase text-gray-900 leading-tight">
                            Bắt Nguồn Từ Đam Mê Cà Phê Việt Nam
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Highlands Coffee® được sinh ra từ niềm đam mê bất tận với hạt cà phê Việt Nam.
                            Bắt đầu với việc đóng gói sản phẩm cà phê tại Hà Nội vào năm 2000, chúng tôi đã
                            nhanh chóng phát triển và mở rộng thành thương hiệu quán cà phê nổi tiếng.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Qua một chặng đường dài, chúng tôi đã không ngừng mang đến những sản phẩm cà phê
                            thơm ngon, sánh đượm trong không gian thoải mái và lịch sự, phục vụ hàng triệu
                            khách hàng mỗi năm.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>25+ năm kinh nghiệm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Globe className="w-4 h-4 text-primary" />
                                <span>Có mặt tại 3 quốc gia</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right duration-700">
                        <Image
                            src="/gallery/phin-den-da.webp"
                            alt="Story"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* VALUES SECTION */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <Badge className="bg-white text-primary border-primary/20 px-4 py-1">
                            <Target className="w-3 h-3 mr-1" /> Giá Trị Cốt Lõi
                        </Badge>
                        <h2 className="text-4xl font-black uppercase text-gray-900">
                            Những Điều Chúng Tôi Tin Tưởng
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Giá trị cốt lõi định hình mọi quyết định và hành động của chúng tôi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((value, idx) => (
                            <Card
                                key={idx}
                                className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <CardContent className="p-6 space-y-4">
                                    <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center`}>
                                        <value.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* TIMELINE SECTION */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                        <TrendingUp className="w-3 h-3 mr-1" /> Hành Trình Phát Triển
                    </Badge>
                    <h2 className="text-4xl font-black uppercase text-gray-900">
                        Dấu Ấn Qua Các Năm
                    </h2>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-orange-400 to-yellow-400 hidden md:block"></div>

                    <div className="space-y-12">
                        {TIMELINE.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-in fade-in slide-in-from-${idx % 2 === 0 ? 'left' : 'right'} duration-700`}
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <Card className="inline-block border-none shadow-lg hover:shadow-xl transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="text-3xl font-black text-primary mb-2">{item.year}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.event}</h3>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg z-10 hidden md:block"></div>
                                <div className="flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="bg-gradient-to-r from-primary via-red-600 to-orange-600 text-white py-20">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black uppercase">
                        Hãy Là Một Phần Của Câu Chuyện
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Tham gia cùng chúng tôi trong hành trình lan tỏa văn hóa cà phê Việt Nam ra thế giới
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap pt-4">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 font-bold shadow-xl text-lg">
                            Tuyển Dụng
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-10 font-bold text-lg backdrop-blur-sm">
                            Nhượng Quyền
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
