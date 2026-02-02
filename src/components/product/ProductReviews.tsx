'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/app/actions/review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from 'next/link';

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
        name: string | null;
        image: string | null;
    };
}

interface ProductReviewsProps {
    productId: number;
    reviews: Review[];
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }

        setIsSubmitting(true);
        const res = await submitReview(productId, rating, comment);
        setIsSubmitting(false);

        if (res.success) {
            toast.success("Đánh giá thành công!");
            setComment('');
            setRating(5);
        } else {
            toast.error(res.error || "Gửi đánh giá thất bại");
        }
    };

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 uppercase text-gray-800">Đánh giá sản phẩm ({reviews.length})</h3>

            <div className="grid md:grid-cols-2 gap-12">
                {/* LIST REVIEWS */}
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    {reviews.length === 0 && (
                        <p className="text-gray-500 italic">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                    )}
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={review.user.image || ''} />
                                    <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{review.user.name}</p>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <span className="ml-auto text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* WRITE REVIEW FORM */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                    <h4 className="font-bold text-lg mb-4">Viết đánh giá của bạn</h4>

                    {session ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-600">Bạn cảm thấy thế nào?</label>
                                <div className="flex gap-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} onClick={() => setRating(star)} type="button">
                                            <Star className={`w-8 h-8 transition-transform hover:scale-110 ${rating >= star ? 'fill-current' : 'text-gray-300'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-600">Nội dung</label>
                                <Textarea
                                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                                    className="bg-white"
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full rounded-full font-bold shadow-lg shadow-red-100"
                            >
                                {isSubmitting ? "Đang gửi..." : "Gửi Đánh Giá"}
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">Vui lòng đăng nhập để viết đánh giá</p>
                            <Link href="/login">
                                <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5">
                                    Đăng Nhập Ngay
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
