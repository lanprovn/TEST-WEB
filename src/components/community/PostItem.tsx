'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MapPin, Award, Bookmark, Send, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleLike, addComment } from "@/app/actions/community";
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Input } from '@/components/ui/input';

interface PostItemProps {
    post: any; // Type this better later
    currentUserId?: string;
}

export function PostItem({ post, currentUserId }: PostItemProps) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const isLiked = post.likes.some((like: any) => like.userId === currentUserId);

    const handleLike = async () => {
        setIsLiking(true);
        const res = await toggleLike(post.id);
        setIsLiking(false);
        if (!res.success) toast.error("Có lỗi xảy ra");
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSubmittingComment(true);
        const res = await addComment(post.id, commentText);
        setIsSubmittingComment(false);

        if (res.success) {
            setCommentText('');
            toast.success("Đã gửi bình luận");
        } else {
            toast.error("Lỗi khi bình luận");
        }
    };

    return (
        <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-none">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                            <AvatarImage src={post.user.image || ''} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-orange-500 text-white font-bold text-xs">
                                {post.user.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-gray-900">{post.user.name}</h4>
                                {post.user.role === 'admin' && (
                                    <Badge className="bg-blue-500 text-white text-[8px] px-1 py-0 h-3">
                                        <Award className="w-2 h-2 mr-0.5" /> ADMIN
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                {post.location && (
                                    <>
                                        <MapPin className="w-2.5 h-2.5" />
                                        <span>{post.location} • </span>
                                    </>
                                )}
                                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: vi })}</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 h-8 w-8">
                        <Bookmark className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                <p className="text-gray-700 leading-relaxed text-sm">{post.content}</p>

                {post.image && (
                    <div className="relative h-72 -mx-6 overflow-hidden bg-gray-100 border-y">
                        <Image
                            src={post.image}
                            alt="PostContent"
                            fill
                            className="object-cover hover:brightness-95 transition-all cursor-pointer"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center gap-1.5 transition-all active:scale-125 ${isLiked
                                ? 'text-red-500 scale-105'
                                : 'text-gray-500 hover:text-red-500'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''} ${isLiking ? 'animate-pulse' : ''}`} />
                            <span className="font-bold text-xs">{post.likes.length}</span>
                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-bold text-xs">{post.comments.length}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* COMMENT SECTION */}
                {showComments && (
                    <div className="space-y-4 pt-4 mt-2 border-t animate-in fade-in slide-in-from-top-2">
                        {/* List Comments */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                            {post.comments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-2">
                                    <Avatar className="w-7 h-7">
                                        <AvatarImage src={comment.user.image || ''} />
                                        <AvatarFallback className="bg-gray-100 text-[10px] font-bold">
                                            {comment.user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-bold text-xs text-gray-900">{comment.user.name}</p>
                                            <span className="text-[10px] text-gray-400">
                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: false, locale: vi })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-700 leading-normal">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Comment */}
                        <form onSubmit={handleComment} className="flex gap-2 items-center">
                            <Input
                                placeholder="Viết bình luận..."
                                className="h-9 rounded-full bg-gray-50 border-none text-xs focus-visible:ring-1 focus-visible:ring-primary/20"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-9 w-9 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full transition-all"
                                disabled={isSubmittingComment || !commentText.trim()}
                            >
                                {isSubmittingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </Button>
                        </form>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
