'use client';

import { useState } from 'react';
import { Camera, MapPin, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { createPost } from "@/app/actions/community";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export function CreatePostForm() {
    const { data: session } = useSession();
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showExtras, setShowExtras] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        const res = await createPost(content, image || undefined, location || undefined);
        setIsSubmitting(false);

        if (res.success) {
            toast.success("Đã đăng bài viết mới!");
            setContent('');
            setImage('');
            setLocation('');
            setShowExtras(false);
        } else {
            toast.error(res.error || "Không thể đăng bài");
        }
    };

    if (!session?.user) return null;

    return (
        <Card className="border-none shadow-sm mb-6 overflow-hidden">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                        <AvatarImage src={session.user.image || ''} />
                        <AvatarFallback className="bg-primary text-white font-bold">
                            {session.user.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <form onSubmit={handleSubmit}>
                            <Textarea
                                placeholder="Bạn đang nghĩ gì thế?"
                                className="min-h-[80px] bg-gray-50/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 resize-none text-base"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onFocus={() => setShowExtras(true)}
                            />

                            {showExtras && (
                                <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                placeholder="Link ảnh (Tùy chọn)"
                                                className="pl-10 h-9 text-xs"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                placeholder="Địa điểm (Tùy chọn)"
                                                className="pl-10 h-9 text-xs"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowExtras(false)}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            className="px-6 font-bold"
                                            disabled={isSubmitting || !content.trim()}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            ) : null}
                                            Đăng Ngay
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
