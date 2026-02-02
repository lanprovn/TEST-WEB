'use client';

import { useState } from 'react';
import { createProduct, deleteProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";
import { Product } from '@/types';

interface AdminProductListProps {
    products: Product[];
}

const CATEGORIES = [
    { id: 'coffee', label: 'Cà Phê' },
    { id: 'freeze', label: 'Freeze' },
    { id: 'tea', label: 'Trà' },
    { id: 'food', label: 'Bánh Mì & Khác' },
];

export function AdminProductList({ products }: AdminProductListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const res = await createProduct(formData);

        setIsSubmitting(false);
        if (res.success) {
            toast.success("Thêm món mới thành công!");
            setIsDialogOpen(false);
        } else {
            toast.error("Thêm món thất bại. Kiểm tra lại thông tin.");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Bạn có chắc muốn xóa món này không?")) {
            const res = await deleteProduct(id);
            if (res.success) {
                toast.success("Đã xóa món ăn.");
            } else {
                toast.error("Xóa thất bại.");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold uppercase text-gray-700">Danh Sách Món ({products.length})</h2>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 gap-2">
                            <Plus className="w-4 h-4" /> Thêm Món Mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Thêm món mới vào thực đơn</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tên món</Label>
                                    <Input name="name" required placeholder="Ví dụ: Phin Sữa Đá" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Giá (VNĐ)</Label>
                                    <Input name="price" type="number" required placeholder="29000" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Danh mục</Label>
                                    <Select name="category" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn danh mục" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map(c => (
                                                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Tag (Optional)</Label>
                                    <Input name="tag" placeholder="Mới, Bán chạy..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Link Ảnh (URL)</Label>
                                <Input name="img" required placeholder="/gallery/..." />
                                <p className="text-xs text-gray-400">Có thể dùng link ảnh online hoặc copy ảnh vào public folder.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Mô tả</Label>
                                <Input name="description" placeholder="Mô tả ngắn về sản phẩm..." />
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full mt-4 font-bold">
                                {isSubmitting ? "Đang xử lý..." : "Lưu Sản Phẩm"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Ảnh</TableHead>
                            <TableHead>Tên Món</TableHead>
                            <TableHead>Danh Mục</TableHead>
                            <TableHead>Giá</TableHead>
                            <TableHead className="text-right">Hành Động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>
                                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border">
                                        <Image src={p.img} alt={p.name} fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {p.name}
                                    {p.tag && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase font-bold">{p.tag}</span>}
                                </TableCell>
                                <TableCell className="capitalize text-gray-500">{p.category}</TableCell>
                                <TableCell className="font-bold text-gray-800">{p.price.toLocaleString('vi-VN')}đ</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
