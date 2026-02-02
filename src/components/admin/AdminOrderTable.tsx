'use client';

import { useState } from 'react';
import { updateOrderStatus } from "@/app/actions/admin";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import { toast } from "sonner"; // Assuming we might add toast later, but for now alert/console

// Define type locally or import from Prisma generated types if possible, 
// but for UI logic we can use an interface matching the data passed
interface OrderWithItems {
    id: string;
    date: Date;
    customerName: string;
    customerPhone: string;
    customerAddr: string;
    customerNote: string | null;
    total: number;
    status: string;
    paymentMethod: string;
    items: {
        id: string;
        quantity: number;
        size: string;
        price: number;
        product: {
            name: string;
            img: string;
        };
    }[];
}

interface AdminOrderTableProps {
    orders: OrderWithItems[];
}

export function AdminOrderTable({ orders }: AdminOrderTableProps) {
    return (
        <div className="rounded-md border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Mã Đơn</TableHead>
                        <TableHead>Ngày Đặt</TableHead>
                        <TableHead>Khách Hàng</TableHead>
                        <TableHead>Tổng Tiền</TableHead>
                        <TableHead>Trạng Thái</TableHead>
                        <TableHead className="text-right">Hành Động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                                Chưa có đơn hàng nào trong hệ thống.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono font-medium text-xs">{order.id.slice(-8).toUpperCase()}</TableCell>
                                <TableCell className="text-sm">{new Date(order.date).toLocaleString('vi-VN')}</TableCell>
                                <TableCell>
                                    <div className="font-medium text-sm">{order.customerName}</div>
                                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                </TableCell>
                                <TableCell className="font-bold text-primary text-sm">{order.total.toLocaleString('vi-VN')}đ</TableCell>
                                <TableCell>
                                    <OrderStatusBadge status={order.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <OrderDetailDialog order={order} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function OrderStatusBadge({ status }: { status: string }) {
    let variant = 'secondary';
    let className = 'bg-gray-100 text-gray-600';

    switch (status) {
        case 'pending':
            variant = 'outline';
            className = 'bg-yellow-50 text-yellow-700 border-yellow-200';
            break;
        case 'processing':
            className = 'bg-blue-50 text-blue-700 border-blue-200';
            break;
        case 'shipping':
            className = 'bg-purple-50 text-purple-700 border-purple-200';
            break;
        case 'completed':
            className = 'bg-green-50 text-green-700 border-green-200';
            break;
        case 'cancelled':
            className = 'bg-red-50 text-red-700 border-red-200';
            break;
    }

    return (
        <Badge variant={variant as any} className={`capitalize ${className}`}>
            {status === 'pending' ? 'Chờ xử lý' :
                status === 'processing' ? 'Đang pha chế' :
                    status === 'shipping' ? 'Đang giao' :
                        status === 'completed' ? 'Hoàn tất' : status}
        </Badge>
    );
}

function OrderDetailDialog({ order }: { order: OrderWithItems }) {
    const [status, setStatus] = useState(order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateStatus = async () => {
        setIsUpdating(true);
        const res = await updateOrderStatus(order.id, status);
        setIsUpdating(false);
        if (!res.success) {
            alert("Lỗi cập nhật trạng thái");
        }
        // Dialog close logic if needed, but Next.js Server Action revalidatePath will refresh the UI behind
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary"><Eye className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chi tiết đơn hàng #{order.id.slice(-8).toUpperCase()}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <h4 className="font-bold text-xs uppercase text-gray-500">Thông tin khách hàng</h4>
                            <div>
                                <p className="font-bold text-sm">{order.customerName}</p>
                                <p className="text-sm">{order.customerPhone}</p>
                            </div>
                            <p className="text-sm text-gray-600 border-t pt-2 mt-2">{order.customerAddr}</p>
                            {order.customerNote && (
                                <p className="text-sm italic text-red-500 bg-red-50 p-2 rounded">"Note: {order.customerNote}"</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-xs uppercase text-gray-500">Cập nhật trạng thái</h4>
                            <div className="flex gap-2">
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                                        <SelectItem value="processing">Đang pha chế</SelectItem>
                                        <SelectItem value="shipping">Đang giao hàng</SelectItem>
                                        <SelectItem value="completed">Hoàn tất</SelectItem>
                                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleUpdateStatus} disabled={status === order.status || isUpdating}>
                                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lưu"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-xs uppercase text-gray-500">Sản phẩm ({order.items.length})</h4>
                        <div className="space-y-3 pr-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 border-b pb-3 last:border-0 border-dashed">
                                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 border bg-white">
                                        <Image src={item.product.img} alt={item.product.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="font-bold line-clamp-1">{item.product.name}</span>
                                            <span>x{item.quantity}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">Size: {item.size}</div>
                                        <div className="text-primary font-medium text-right">
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 font-bold text-lg border-t-2 border-dashed">
                            <span>Tổng cộng:</span>
                            <span className="text-primary">{order.total.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
