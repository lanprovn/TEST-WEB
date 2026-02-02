'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SearchDialog() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary hover:bg-primary/5">
                    <Search className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] top-[20%] translate-y-[-20%]">
                <DialogHeader>
                    <DialogTitle>Tìm kiếm món</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                    <Input
                        placeholder="Tìm cà phê, trà sen, bánh mì..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Tìm</Button>
                </form>
                <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Từ khóa phổ biến</p>
                    <div className="flex flex-wrap gap-2">
                        {['Phin Sữa Đá', 'Trà Sen Vàng', 'Freeze Trà Xanh', 'Bánh Mì'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setOpen(false);
                                    router.push(`/search?q=${encodeURIComponent(tag)}`);
                                }}
                                className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
