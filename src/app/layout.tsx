import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from "@/components/layout/AppProviders";

export const metadata: Metadata = {
  title: 'Highlands Coffee | Thương Hiệu Bắt Nguồn Từ Cà Phê Việt Nam',
  description: 'Trải nghiệm cà phê, trà và bánh ngọt tuyệt hảo từ Highlands Coffee.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
