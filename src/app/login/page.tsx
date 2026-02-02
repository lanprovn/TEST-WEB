'use client';

import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Chrome, ArrowLeft } from "lucide-react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Note: In client component we usually call signIn from next-auth/react
        // For demo credentials:
        await signIn("credentials", {
            email: "demo@highlands.com",
            password: "123456",
            callbackUrl: "/"
        });
        setIsLoading(false);
    }

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signIn("google", { callbackUrl: "/" });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfbf8] p-4">
            <Card className="w-full max-w-md border-none shadow-xl">
                <CardHeader className="text-center space-y-4">
                    <Link href="/" className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white ring-4 ring-primary/20 hover:scale-105 transition-transform">
                        <Coffee className="w-8 h-8" />
                    </Link>
                    <CardTitle className="text-2xl font-bold uppercase text-primary">Đăng Nhập</CardTitle>
                    <CardDescription>
                        Chào mừng trở lại với Highlands Coffee!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleCredentialsLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="demo@highlands.com" defaultValue="demo@highlands.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" placeholder="••••••" defaultValue="123456" required />
                        </div>
                        <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90 font-bold" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập ngay"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">Hoặc tiếp tục với</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full rounded-full" onClick={handleGoogleLogin} disabled={isLoading}>
                        <Chrome className="mr-2 h-4 w-4" /> Google
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-gray-500">
                    <p>Chưa có tài khoản? <Link href="#" className="font-bold text-primary hover:underline">Đăng ký ngay</Link></p>
                    <Link href="/" className="flex items-center hover:text-gray-800 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại trang chủ
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
