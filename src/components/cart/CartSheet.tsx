'use client';

import Link from 'next/link';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store";

export function CartSheet() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCartStore();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetTrigger asChild>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-red-200 relative">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Giỏ Hàng</span>
                    <span className="ml-1 font-mono bg-white text-primary text-xs rounded-full px-1.5 h-4 flex items-center justify-center">
                        {itemCount}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center text-xl font-bold uppercase tracking-wide">
                        <ShoppingBag className="w-5 h-5 mr-2 text-primary" />
                        Giỏ Hàng ({itemCount})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-50 space-y-4">
                        <ShoppingBag className="w-16 h-16 text-gray-300" />
                        <p className="text-lg font-medium">Giỏ hàng của bạn đang trống</p>
                        <Button variant="outline" onClick={toggleCart}>Tiếp tục mua sắm</Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6 py-4">
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                                                <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                                    {item.tag && <span>{item.tag}</span>}
                                                    <span className="bg-gray-100 px-1.5 rounded text-gray-700 font-bold">Size {item.size}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="font-bold text-primary text-sm">{item.displayPrice}</p>

                                                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-0.5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className="p-1 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id, item.size)}
                                            className="text-gray-400 hover:text-red-500 self-start p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="border-t pt-4 space-y-4">
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span>Tổng tiền:</span>
                                <span className="text-primary">{totalPrice().toLocaleString('vi-VN')}đ</span>
                            </div>
                            <SheetClose asChild>
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full h-12 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-red-100">
                                        Thanh Toán Ngay
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
