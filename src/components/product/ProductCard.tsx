'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation();
        addItem(product);
    };

    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <Card className="group overflow-hidden border-none shadow-none hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col cursor-pointer">
                <CardHeader className="p-0 relative aspect-square overflow-hidden bg-gray-50">
                    {product.tag && (
                        <Badge className="absolute top-3 left-3 z-10 bg-accent text-white border-none shadow-md">
                            {product.tag}
                        </Badge>
                    )}
                    <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                </CardHeader>
                <CardContent className="p-6 text-center flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2 truncate" title={product.name}>
                        {product.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-bold text-lg">
                        {product.displayPrice}
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <Button
                        className="rounded-full w-full bg-primary hover:bg-primary/90 group-hover:shadow-lg"
                        onClick={handleAddToCart}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Thêm nhanh
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
