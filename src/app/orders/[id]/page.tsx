
import { notFound } from 'next/navigation';
import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, MapPin, Truck, Calendar } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params, searchParams }: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ success?: string }>
}) {
    const { id } = await params;
    const { success } = await searchParams;

    const order = await prisma.order.findUnique({
        where: { id: id },
        include: { items: { include: { product: true } } }
    });

    if (!order) return notFound();

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            <div className="container mx-auto px-4 py-12">
                {/* SUCCESS MESSAGE */}
                {success === 'true' && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-green-800 mb-2">Đặt Hàng Thành Công!</h1>
                        <p className="text-green-700">Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là <span className="font-mono font-bold">{order.id}</span></p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                    {/* ORDER INFO */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="w-5 h-5" /> Chi tiết đơn hàng
                                </CardTitle>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="outline">{order.status}</Badge>
                                    <Badge variant="secondary" className="font-mono">{new Date(order.date).toLocaleString('vi-VN')}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border">
                                            <Image src={item.product.img} alt={item.product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800">{item.product.name}</h4>
                                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <Badge variant="outline" className="text-xs">x{item.quantity}</Badge>
                                                <span className="font-medium text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MapPin className="w-4 h-4" /> Thông tin nhận hàng
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-3">
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase mb-1">Người nhận</span>
                                    <span className="font-bold">{order.customerName}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase mb-1">Số điện thoại</span>
                                    <span className="font-mono">{order.customerPhone}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase mb-1">Địa chỉ</span>
                                    <span>{order.customerAddr}</span>
                                </div>
                                {order.customerNote && (
                                    <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-yellow-800 italic">
                                        "{order.customerNote}"
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-primary/5 border-primary">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Truck className="w-4 h-4" /> Thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Phương thức</span>
                                    <span className="font-bold uppercase">{order.paymentMethod}</span>
                                </div>
                                <Separator className="my-2 bg-primary/20" />
                                <div className="flex justify-between items-center text-lg font-black text-primary">
                                    <span>Tổng tiền</span>
                                    <span>{order.total.toLocaleString('vi-VN')}đ</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
