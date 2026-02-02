
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminOrderTable } from "@/components/admin/AdminOrderTable";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Activity, Coffee } from 'lucide-react';
import Link from "next/link";

// Force dynamic rendering ensure admin always sees latest data
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    // Fetch Orders
    const orders = await prisma.order.findMany({
        orderBy: { date: 'desc' },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    // Calculate Stats
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'cancelled' ? order.total : 0), 0);
    const totalOrders = orders.length;
    // Unique customers by name (simple logic)
    const uniqueCustomers = new Set(orders.map(o => o.customerName)).size;

    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    return (
        <main className="min-h-screen bg-gray-50/50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wide mb-8">Admin Dashboard</h1>

                {/* STATS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{totalRevenue.toLocaleString('vi-VN')}đ</div>
                            <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                            <p className="text-xs text-muted-foreground">Tất cả đơn hàng</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Khách Hàng</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{uniqueCustomers}</div>
                            <p className="text-xs text-muted-foreground">Khách hàng active</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Chờ Xử Lý</CardTitle>
                            <Activity className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
                            <p className="text-xs text-muted-foreground">Cần duyệt ngay</p>
                        </CardContent>
                    </Card>

                    {/* NEW NAV CARD */}
                    <Link href="/admin/products" className="block h-full">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-primary/20 bg-primary/5 h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-bold text-primary">Quản Lý Món</CardTitle>
                                <Coffee className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">+</div>
                                <p className="text-xs text-primary/80">Thêm / Sửa / Xóa món ăn</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* ORDER TABLE */}
                <h2 className="text-xl font-bold mb-4">Danh Sách Đơn Hàng Mới Nhất</h2>
                <AdminOrderTable orders={orders as any} />
            </div>

            <Footer />
        </main>
    );
}
