'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types"; // Make sure Product matches prisma type roughly
import { CATEGORIES } from "@/lib/data"; // Keep static categories for now

interface MenuSectionProps {
    products: Product[];
}

export function MenuSection({ products }: MenuSectionProps) {
    return (
        <section className="py-20 container mx-auto px-4" id="menu">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-widest mb-4">Khám Phá Thực Đơn</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <Tabs defaultValue="coffee" className="w-full">
                <div className="flex justify-center mb-10">
                    <TabsList className="bg-white border border-gray-100 p-1 h-auto rounded-full shadow-sm flex-wrap justify-center">
                        {CATEGORIES.map((cat) => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="rounded-full px-6 py-3 text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                            >
                                {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {CATEGORIES.map((cat) => (
                    <TabsContent key={cat.id} value={cat.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.filter((p: Product) => p.category === cat.id).map((prod) => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}
