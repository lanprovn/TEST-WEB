# 🐘 Hướng Dẫn Setup PostgreSQL - Chi Tiết Từng Bước

## 📋 Mục Lục
1. [Chọn Nhà Cung Cấp](#chọn-nhà-cung-cấp)
2. [Setup Vercel Postgres (Khuyến Nghị)](#setup-vercel-postgres)
3. [Setup Supabase (Alternative)](#setup-supabase)
4. [Cấu Hình Prisma](#cấu-hình-prisma)
5. [Migration Database](#migration-database)
6. [Deploy](#deploy)

---

## 🎯 Chọn Nhà Cung Cấp

### **Option 1: Vercel Postgres** ⭐ (Khuyến Nghị)
- ✅ Tích hợp hoàn hảo với Vercel
- ✅ Free tier: 256MB storage, 60 giờ compute/tháng
- ✅ Setup cực nhanh (1 phút)
- ❌ Giới hạn free tier thấp

### **Option 2: Supabase** 🔥 (Tốt Nhất Cho Free)
- ✅ Free tier: 500MB storage, unlimited requests
- ✅ Có dashboard quản lý đẹp
- ✅ Nhiều tính năng (Auth, Storage, Realtime)
- ✅ Không giới hạn thời gian

### **Option 3: Neon** ⚡
- ✅ Free tier: 512MB storage
- ✅ Serverless PostgreSQL
- ✅ Auto-scaling

---

## 🚀 Setup Vercel Postgres (Khuyến Nghị)

### Bước 1: Tạo Database
```bash
# Cài Vercel CLI nếu chưa có
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Tạo Postgres database
vercel postgres create
```

### Bước 2: Lấy Connection String
```bash
# Pull environment variables về local
vercel env pull .env.local
```

File `.env.local` sẽ có:
```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
```

### Bước 3: Cập nhật `.env`
```env
# Copy POSTGRES_PRISMA_URL vào DATABASE_URL
DATABASE_URL="postgres://default:xxx@xxx.vercel-storage.com:5432/verceldb?sslmode=require"
```

---

## 🔥 Setup Supabase (Alternative - Free Tốt Nhất)

### Bước 1: Tạo Project
1. Vào [supabase.com](https://supabase.com)
2. Sign up / Login
3. Click **"New Project"**
4. Nhập:
   - **Name**: `highlands-shop`
   - **Database Password**: (tạo password mạnh)
   - **Region**: `Southeast Asia (Singapore)`
5. Click **"Create new project"** (chờ ~2 phút)

### Bước 2: Lấy Connection String
1. Vào **Settings** → **Database**
2. Scroll xuống **Connection string**
3. Chọn tab **"URI"**
4. Copy connection string (dạng: `postgresql://postgres:[YOUR-PASSWORD]@...`)

### Bước 3: Cập nhật `.env`
```env
# Thay [YOUR-PASSWORD] bằng password anh đã tạo
DATABASE_URL="postgresql://postgres.xxxxx:YOUR-PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Thêm Direct URL (không qua pooler) cho migration
DIRECT_URL="postgresql://postgres.xxxxx:YOUR-PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

---

## ⚙️ Cấu Hình Prisma

### Bước 1: Cập nhật `prisma/schema.prisma`

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Chỉ cần nếu dùng Supabase
}

generator client {
  provider = "prisma-client-js"
}

// ... rest of your models
```

### Bước 2: Cài package PostgreSQL
```bash
npm install @prisma/client
```

---

## 🔄 Migration Database

### Bước 1: Tạo Migration
```bash
# Reset database (xóa SQLite cũ)
rm -f prisma/dev.db prisma/dev.db-journal

# Tạo migration mới cho PostgreSQL
npx prisma migrate dev --name init_postgresql
```

### Bước 2: Generate Prisma Client
```bash
npx prisma generate
```

### Bước 3: Seed Data (Optional)
```bash
# Tạo dữ liệu mẫu
npx tsx prisma/seed.ts
npx tsx prisma/seed-community.ts
```

### Bước 4: Kiểm tra Database
```bash
# Mở Prisma Studio để xem data
npx prisma studio
```

---

## 🚀 Deploy Lên Vercel

### Bước 1: Thêm Environment Variables

Vào **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**

Thêm:
```
DATABASE_URL = postgresql://...
DIRECT_URL = postgresql://... (nếu dùng Supabase)
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = (generate bằng: openssl rand -base64 32)
```

### Bước 2: Deploy
```bash
# Push code lên GitHub
git add .
git commit -m "Switch to PostgreSQL"
git push

# Hoặc deploy trực tiếp
vercel --prod
```

### Bước 3: Run Migration Trên Production
```bash
# Sau khi deploy xong
vercel env pull .env.production
npx prisma migrate deploy
```

---

## 🧪 Test Local Với PostgreSQL

```bash
# Chạy dev server
npm run dev

# Test các tính năng:
# - Đăng ký/Đăng nhập
# - Tạo đơn hàng
# - Đăng bài community
# - Thêm review
```

---

## 🔍 Troubleshooting

### Lỗi: "Can't reach database server"
```bash
# Kiểm tra connection string
echo $DATABASE_URL

# Test connection
npx prisma db pull
```

### Lỗi: "SSL connection required"
Thêm `?sslmode=require` vào cuối DATABASE_URL:
```
DATABASE_URL="postgresql://...?sslmode=require"
```

### Lỗi: "Prepared statement already exists"
Thêm `?pgbouncer=true` vào connection string (Supabase)

---

## 📊 So Sánh Nhà Cung Cấp

| Feature | Vercel Postgres | Supabase | Neon |
|---------|----------------|----------|------|
| **Free Storage** | 256MB | 500MB | 512MB |
| **Free Compute** | 60h/month | Unlimited | Unlimited |
| **Setup Time** | 1 min | 2 min | 2 min |
| **Dashboard** | Basic | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Extra Features** | - | Auth, Storage | Auto-scaling |

---

## ✅ Checklist Hoàn Thành

- [ ] Tạo PostgreSQL database
- [ ] Cập nhật `prisma/schema.prisma`
- [ ] Cập nhật `.env` với DATABASE_URL
- [ ] Chạy `npx prisma migrate dev`
- [ ] Chạy `npx prisma generate`
- [ ] Seed data
- [ ] Test local
- [ ] Thêm env vars vào Vercel
- [ ] Deploy production
- [ ] Run migration trên production

---

**🎉 Xong! Giờ app của anh đã sẵn sàng cho production!**
