
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Calendar } from 'lucide-react';
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function OrderHistoryPage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
        include: { items: true } // just to count items
    });

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold uppercase tracking-wide">Đơn hàng của tôi</h1>
                    <p className="text-gray-500">Xin chào, {session.user.name}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Bạn chưa có đơn hàng nào</h2>
                        <Link href="/">
                            <Button className="mt-4 rounded-full">Mua sắm ngay</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow border-none shadow-sm">
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono font-bold text-gray-800">#{order.id.slice(-8).toUpperCase()}</span>
                                            <Badge variant={
                                                order.status === 'pending' ? 'outline' :
                                                    order.status === 'completed' ? 'default' : 'secondary'
                                            } className={
                                                order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''
                                            }>
                                                {order.status === 'pending' ? 'Chờ xử lý' : order.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(order.date).toLocaleString('vi-VN')}
                                        </div>
                                        <div className="text-sm">
                                            {order.items.length} sản phẩm • Tổng tiền: <span className="font-bold text-primary">{order.total.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>

                                    <Link href={`/orders/${order.id}`}>
                                        <Button variant="outline" className="rounded-full group">
                                            Xem chi tiết <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
