
import { Users, Camera, TrendingUp, Award, Instagram, Facebook, Send, Sparkles, Gift, Calendar, Tag, Heart } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { CreatePostForm } from "@/components/community/CreatePostForm";
import { PostItem } from "@/components/community/PostItem";

export const dynamic = 'force-dynamic';

const TRENDING_TAGS = [
    { tag: "#HighlandsCoffee", count: "12.5K" },
    { tag: "#PhinSuaDa", count: "8.2K" },
    { tag: "#FreezeTraXanh", count: "6.7K" },
    { tag: "#CafeHopping", count: "5.1K" },
    { tag: "#SaigonCafe", count: "4.3K" },
];

export default async function CommunityPage() {
    const session = await auth();
    const currentUserId = session?.user?.id;

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    role: true
                }
            },
            likes: true,
            comments: {
                orderBy: { createdAt: 'asc' },
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            }
        }
    });

    // Top contributors (Sample data, in real app would be aggregated)
    const topContributors = [
        { name: "Thảo Vy", posts: 234, avatar: "TV" },
        { name: "Minh Anh", posts: 189, avatar: "MA" },
        { name: "Hoàng Nam", posts: 156, avatar: "HN" },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1 backdrop-blur-sm">
                        <Users className="w-3 h-3 mr-1 inline" /> {posts.length + 50}K+ bài viết
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-widest mb-4 animate-in fade-in duration-700">
                        Cộng Đồng Highlands
                    </h1>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Nơi chia sẻ khoảnh khắc, đam mê cà phê và kết nối cùng hàng ngàn người yêu thích Highlands
                    </p>

                    {!session && (
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-bold shadow-xl">
                                Gia Nhập Ngay
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* MAIN FEED */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* CREATE POST BOX */}
                        <CreatePostForm />

                        <Tabs defaultValue="latest" className="w-full" suppressHydrationWarning>
                            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm rounded-xl overflow-hidden h-12" suppressHydrationWarning>
                                <TabsTrigger value="latest" className="font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                                    <TrendingUp className="w-4 h-4 mr-2" /> Mới Nhất
                                </TabsTrigger>
                                <TabsTrigger value="popular" className="font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                                    <Heart className="w-4 h-4 mr-2" /> Phổ Biến
                                </TabsTrigger>
                                <TabsTrigger value="following" className="font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                                    <Users className="w-4 h-4 mr-2" /> Đang Theo Dõi
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="latest" className="space-y-6 mt-6">
                                {posts.length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                                        <Camera className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-400 font-medium italic">Hãy là người đầu tiên chia sẻ khoảnh khắc!</p>
                                    </div>
                                ) : (
                                    posts.map((post: any) => (
                                        <PostItem key={post.id} post={post} currentUserId={currentUserId} />
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="popular" className="mt-6">
                                <div className="text-center py-20 bg-white rounded-xl">
                                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Đang cập nhật bài viết xu hướng...</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-6">
                        {/* TRENDING TAGS */}
                        <Card className="border-none shadow-sm rounded-2xl">
                            <CardHeader className="pb-2">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Hashtag Thịnh Hành
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {TRENDING_TAGS.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between hover:bg-primary/5 p-2 rounded-xl cursor-pointer transition-all group">
                                        <span className="font-medium text-gray-600 group-hover:text-primary transition-colors">{item.tag}</span>
                                        <Badge variant="secondary" className="text-[10px] font-bold">{item.count} bài</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* TOP CONTRIBUTORS */}
                        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    Bảng Xếp Hạng
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {topContributors.map((user, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-1">
                                        <div className="relative">
                                            <Avatar className="w-10 h-10 border-2 border-primary/10">
                                                <AvatarFallback className="bg-gradient-to-br from-primary to-orange-500 text-white font-bold">
                                                    {user.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            {idx === 0 && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]">
                                                    👑
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-gray-900">{user.name}</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-medium tracking-tight">{user.posts} Chia sẻ</p>
                                        </div>
                                        <div className={`text-lg font-black ${idx === 0 ? 'text-yellow-500' : 'text-gray-200'}`}>
                                            #{idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* SOCIAL LINKS */}
                        <Card className="border-none shadow-xl bg-gradient-to-br from-primary via-red-600 to-orange-600 text-white rounded-2xl">
                            <CardContent className="pt-8 text-center space-y-5">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full w-fit mx-auto">
                                    <Sparkles className="w-8 h-8 text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl mb-1 uppercase tracking-tight">Cộng Đồng Highlands</h3>
                                    <p className="text-xs opacity-80">Gia nhập cộng đồng người yêu cà phê lớn nhất Việt Nam</p>
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <Button size="icon" className="bg-white/10 hover:bg-white text-primary rounded-full transition-all group shadow-lg">
                                        <Facebook className="w-5 h-5" />
                                    </Button>
                                    <Button size="icon" className="bg-white/10 hover:bg-white text-primary rounded-full transition-all group shadow-lg">
                                        <Instagram className="w-5 h-5" />
                                    </Button>
                                    <Button size="icon" className="bg-white/10 hover:bg-white text-primary rounded-full transition-all group shadow-lg">
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
