'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { Product, ProductSize, Review } from '@/types';
import { ProductReviews } from "@/components/product/ProductReviews";
import { toast } from "sonner";

interface ProductDetailContentProps {
    product: Product;
    reviews: Review[];
}

export function ProductDetailContent({ product, reviews }: ProductDetailContentProps) {
    const { addItem } = useCartStore();

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState<ProductSize>('S');

    // Calculate dynamic price based on size
    const getPrice = () => {
        let price = product.price;
        if (size === 'M') price += 6000;
        if (size === 'L') price += 10000;
        return price;
    };

    const handleAddToCart = () => {
        // Construct CartItem with explicit price and required fields
        const productToAdd = {
            ...product,
            price: product.price, // ensure number
            displayPrice: product.displayPrice || '', // ensure string
            tag: product.tag || '',
            description: product.description || ''
        };

        for (let i = 0; i < quantity; i++) {
            addItem(productToAdd, size);
        }
        toast.success(`Đã thêm ${quantity} ${product.name} (${size}) vào giỏ hàng!`);
    };

    // Calculate Average Rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/#menu" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại thực đơn
            </Link>

            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
                {/* IMAGE COLUMN */}
                <div className="relative aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-8">
                    {product.tag && (
                        <Badge className="absolute top-4 left-4 z-10 bg-accent text-white scale-125 origin-top-left">
                            {product.tag}
                        </Badge>
                    )}
                    <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-contain p-8 animate-in zoom-in duration-500"
                    />
                </div>

                {/* INFO COLUMN */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <Badge variant="outline" className="text-primary border-primary mb-3 uppercase tracking-wider text-xs font-bold">
                            {product.category}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            {Number(averageRating) > 0 ? (
                                <>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="text-gray-800 font-bold ml-1">{averageRating}</span>
                                    <span className="text-gray-400 text-sm ml-2">({reviews.length} đánh giá)</span>
                                </>
                            ) : (
                                <span className="text-gray-400 text-sm">Chưa có đánh giá</span>
                            )}
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {product.description || "Hương vị đặc trưng của Highlands Coffee. Sự kết hợp hoàn hảo, đậm đà, mang lại trải nghiệm tuyệt vời cho ngày mới năng động."}
                        </p>
                    </div>

                    <Separator />

                    {/* SIZE SELECTOR */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Chọn Kích Cỡ</h3>
                        <div className="flex gap-4">
                            {(['S', 'M', 'L'] as ProductSize[]).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold border-2 transition-all
                            ${size === s
                                            ? 'border-primary bg-primary/10 text-primary scale-110 shadow-lg shadow-red-100'
                                            : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* ACTIONS */}
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1 font-medium">Tổng cộng</p>
                            <p className="text-4xl font-black text-primary">
                                {(getPrice() * quantity).toLocaleString('vi-VN')}đ
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Quantity */}
                            <div className="flex items-center bg-gray-100 rounded-full p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Add Button */}
                            <Button
                                size="lg"
                                className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-red-200"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" /> Thêm vào giỏ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ProductReviews productId={product.id} reviews={reviews as any[]} />
        </div>
    );
}
