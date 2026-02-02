
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuSection } from "@/components/home/MenuSection";
import { prisma } from "@/lib/db";
import { Product } from '@/types';

// Force dynamic rendering if we want to ensure latest data (though standard generic fetching usually caches)
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch products from Database
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-[#fcfbf8]">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-primary/5 z-0">
          <Image src="/gallery/hero-bg.png" alt="Hero BG" fill className="object-cover opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-1.5 text-sm uppercase tracking-wider font-bold">
              🌟 Món mới phải thử
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight">
              PHIN SỮA ĐÁ
              <span className="block text-gray-800 text-3xl md:text-5xl font-bold mt-2">ĐẬM ĐÀ BẢN SẮC</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Hương vị cà phê Việt Nam đích thực. Sự kết hợp hoàn hảo giữa hạt cà phê Robusta thượng hạng và sữa đặc ngọt ngào.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary text-white rounded-full px-8 text-lg shadow-xl shadow-red-200 hover:scale-105 transition-transform">
                Đặt Ngay
              </Button>
              <Link href="#menu">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg border-primary text-primary hover:bg-red-50">
                  Xem Menu
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/gallery/hero-header.png"
              alt="Phin Sua Da"
              fill
              className="object-contain drop-shadow-2xl animate-in fade-in slide-in-from-right-10 duration-1000"
            />
          </div>
        </div>
      </section>

      {/* MENU SECTION (Client Component) */}
      <MenuSection products={products as unknown as Product[]} />

      {/* BANNER PROMO */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-primary h-[300px] flex items-center px-10 text-white shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image src="/gallery/cta-two-bg.png" alt="Pattern" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-4xl font-black mb-4 uppercase">Ưu đãi thành viên</h3>
            <p className="text-lg mb-6 opacity-90">Đăng ký thành viên Highlands ngay để tích điểm và nhận hàng ngàn ưu đãi độc quyền.</p>
            <Button variant="secondary" size="lg" className="rounded-full font-bold text-primary hover:bg-white">
              Đăng ký ngay
            </Button>
          </div>
          <div className="hidden lg:block absolute right-10 bottom-[-50px] w-[300px] h-[300px]">
            <Image src="/gallery/app-store.svg" alt="App" width={140} height={50} className="mb-4" />
            <Image src="/gallery/google-play.svg" alt="App" width={140} height={50} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
