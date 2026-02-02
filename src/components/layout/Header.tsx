'use client';

import Link from 'next/link';
import { Search, Coffee, User, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/CartSheet";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="container mx-auto h-20 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-primary/20">
                        HIGHLANDS
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8 font-bold text-gray-700 uppercase text-sm tracking-wide">
                    <Link href="/#menu" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Coffee className="w-4 h-4" /> Thực Đơn
                    </Link>
                    <Link href="/news" className="hover:text-primary transition-colors">Khuyến Mãi</Link>
                    <Link href="/community" className="hover:text-primary transition-colors">Cộng Đồng</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">Về Chúng Tôi</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <SearchDialog />

                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full ring-2 ring-gray-100">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={session.user?.image || ''} />
                                        <AvatarFallback className="bg-primary text-white font-bold text-xs">
                                            {session.user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/admin">
                                        <LayoutDashboard className="mr-2 h-4 w-4" /> Quản Trị Viên
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders">
                                        <ShoppingBag className="mr-2 h-4 w-4" /> Đơn Hàng Của Tôi
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => signOut()}>
                                    <LogOut className="mr-2 h-4 w-4" /> Đăng Xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary hover:bg-primary/5">
                                <User className="w-5 h-5" />
                            </Button>
                        </Link>
                    )}

                    <CartSheet />
                </div>
            </div>
        </header>
    );
}
