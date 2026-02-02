'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { createOrder } from "@/app/actions/checkout";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        note: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // If cart is empty, show empty state
    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-[#fcfbf8]">
                <Header />
                <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h1>
                    <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào để thanh toán.</p>
                    <Link href="/">
                        <Button className="rounded-full bg-primary hover:bg-primary/90 px-8">Quay lại mua sắm</Button>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const result = await createOrder({
                customer: {
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    note: formData.note
                },
                items: items,
                total: totalPrice(),
                paymentMethod: paymentMethod
            });

            if (result.success) {
                clearCart();
                router.push(`/orders/${result.orderId}?success=true`);
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Đặt hàng thất bại. Vui lòng thử lại.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#fcfbf8]">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại cửa hàng
                </Link>

                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wide mb-8">Thanh Toán</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT: FORM */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" /> Thông tin giao hàng
                                </CardTitle>
                                <CardDescription>Vui lòng điền chính xác địa chỉ nhận hàng.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Họ và tên</Label>
                                            <Input id="name" required value={formData.name} onChange={handleInputChange} placeholder="Nguyễn Văn A" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Số điện thoại</Label>
                                            <Input id="phone" required value={formData.phone} onChange={handleInputChange} placeholder="09xxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Địa chỉ cụ thể</Label>
                                        <Input id="address" required value={formData.address} onChange={handleInputChange} placeholder="Số nhà, tên đường, phường/xã..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="note">Ghi chú (Tùy chọn)</Label>
                                        <Textarea id="note" value={formData.note} onChange={handleInputChange} placeholder="Ví dụ: Ít đá, giao giờ hành chính..." />
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" /> Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={paymentMethod} onValueChange={(v: 'cod' | 'banking') => setPaymentMethod(v)}>
                                    <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-primary/5 border-primary' : 'hover:bg-gray-50'}`}>
                                        <RadioGroupItem value="cod" id="cod" />
                                        <Label htmlFor="cod" className="flex-1 cursor-pointer font-medium">Thanh toán khi nhận hàng (COD)</Label>
                                        <Truck className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'banking' ? 'bg-primary/5 border-primary' : 'hover:bg-gray-50'}`}>
                                        <RadioGroupItem value="banking" id="banking" />
                                        <Label htmlFor="banking" className="flex-1 cursor-pointer font-medium">Chuyển khoản Ngân hàng (QR Code)</Label>
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="lg:col-span-1">
                        <Card className="border-none shadow-md bg-white sticky top-24">
                            <CardHeader>
                                <CardTitle>Đơn hàng của bạn</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-3">
                                            <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden shrink-0">
                                                <Image src={item.img} alt={item.name} fill className="object-cover" />
                                                <span className="absolute bottom-0 right-0 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 text-sm">
                                                <p className="font-bold line-clamp-1">{item.name}</p>
                                                <p className="text-gray-500 text-xs">Size: {item.size}</p>
                                                <p className="font-medium text-primary mt-1">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span>{totalPrice().toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span>Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Tổng cộng</span>
                                        <span className="text-primary">{totalPrice().toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isProcessing}
                                    className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-red-200 mt-4"
                                >
                                    {isProcessing ? 'Đang xử lý...' : 'Đặt Hàng Ngay'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
