'use client';

export function Footer() {
    return (
        <footer className="bg-[#3f2e27] text-white py-12 mt-20">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h4 className="font-bold text-xl uppercase mb-4">Giới thiệu</h4>
                    <p className="opacity-70 text-sm leading-relaxed">
                        Thương hiệu bắt nguồn từ cà phê Việt Nam. Tự hào mang hương vị di sản đến với thế giới hiện đại.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4">Sản Phẩm</h4>
                    <ul className="space-y-2 text-sm opacity-70">
                        <li>Cà Phê</li>
                        <li>Freeze</li>
                        <li>Trà</li>
                        <li>Bánh Mì</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4">Hỗ Trợ</h4>
                    <ul className="space-y-2 text-sm opacity-70">
                        <li>Tìm Cửa Hàng</li>
                        <li>Tuyển Dụng</li>
                        <li>Tin Tức</li>
                        <li>Liên Hệ</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4">Kết nối</h4>
                    <div className="flex gap-2 mb-4">
                        {/* Social Icons Placeholder */}
                    </div>
                    <p className="text-xs opacity-50">© 2026 Highlands Coffee Clone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
