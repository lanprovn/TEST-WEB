# Hướng Dẫn Deploy Lên Vercel

## ✅ Chuẩn Bị

Build đã thành công! Giờ anh có thể deploy lên Vercel.

## 🚀 Các Bước Deploy

### 1. Cài Vercel CLI (nếu chưa có)
```bash
npm i -g vercel
```

### 2. Login vào Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Hoặc deploy production ngay:
```bash
vercel --prod
```

## ⚙️ Environment Variables Cần Thiết

Khi deploy, anh cần thêm các biến môi trường sau vào Vercel Dashboard:

### Database
```
DATABASE_URL="file:./dev.db"
```
**LƯU Ý**: SQLite không hoạt động tốt trên Vercel. Anh nên chuyển sang **PostgreSQL** hoặc **MySQL** cho production.

### NextAuth
```
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"
```

## 🔄 Chuyển Sang PostgreSQL (Khuyến Nghị)

### 1. Tạo Database trên Vercel Postgres hoặc Supabase

### 2. Cập nhật `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Chạy migration:
```bash
npx prisma migrate deploy
npx prisma generate
```

## 📝 Checklist Trước Khi Deploy

- ✅ Build thành công (`npm run build`)
- ✅ Tất cả environment variables đã được set
- ✅ Database đã sẵn sàng (PostgreSQL cho production)
- ✅ NEXTAUTH_URL trỏ đúng domain
- ✅ Git repository đã push lên GitHub/GitLab

## 🎯 Deploy Tự Động Qua GitHub

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com)
3. Import repository
4. Thêm Environment Variables
5. Deploy!

Mỗi lần push code mới, Vercel sẽ tự động build và deploy.

---

**Lưu ý**: Với SQLite hiện tại, app chỉ chạy được local. Để deploy production, BẮT BUỘC phải chuyển sang PostgreSQL hoặc MySQL.
