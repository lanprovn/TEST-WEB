# 🔄 Script Chuyển Đổi Sang PostgreSQL

Chạy các lệnh sau theo thứ tự:

## 1️⃣ Backup Database Hiện Tại (SQLite)
```bash
# Backup file database
cp prisma/dev.db prisma/dev.db.backup
```

## 2️⃣ Cập Nhật Prisma Schema
```bash
# Mở file prisma/schema.prisma
# Thay đổi dòng 9-10 từ:
#   provider = "sqlite"
#   url      = env("DATABASE_URL")
# 
# Thành:
#   provider  = "postgresql"
#   url       = env("DATABASE_URL")
#   directUrl = env("DIRECT_URL")  # Chỉ cần nếu dùng Supabase
```

## 3️⃣ Cập Nhật .env
```bash
# Copy file mẫu
cp .env.postgresql.example .env

# Sau đó mở .env và điền DATABASE_URL từ:
# - Vercel Postgres, hoặc
# - Supabase, hoặc
# - Neon
```

## 4️⃣ Xóa SQLite Cũ
```bash
rm -f prisma/dev.db prisma/dev.db-journal
rm -rf prisma/migrations
```

## 5️⃣ Tạo Migration Mới
```bash
npx prisma migrate dev --name init_postgresql
```

## 6️⃣ Generate Prisma Client
```bash
npx prisma generate
```

## 7️⃣ Seed Data
```bash
npx tsx prisma/seed.ts
npx tsx prisma/seed-community.ts
npx tsx prisma/create-test-user.ts
```

## 8️⃣ Test
```bash
npm run dev
# Truy cập http://localhost:3000
# Test đăng nhập, tạo đơn hàng, đăng bài community
```

## 9️⃣ Deploy
```bash
# Push lên GitHub
git add .
git commit -m "Migrate to PostgreSQL"
git push

# Deploy lên Vercel
vercel --prod
```

## 🔟 Production Migration
```bash
# Sau khi deploy, chạy migration trên production
vercel env pull .env.production
npx prisma migrate deploy
```

---

## ⚠️ Lưu Ý Quan Trọng

1. **Backup trước khi chuyển đổi!**
2. **Test kỹ trên local trước khi deploy**
3. **Đảm bảo DATABASE_URL đúng format**
4. **Thêm environment variables vào Vercel Dashboard**

---

## 🆘 Nếu Có Lỗi

### Lỗi kết nối database:
```bash
npx prisma db pull
```

### Lỗi migration:
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Lỗi Prisma Client:
```bash
rm -rf node_modules/.prisma
npx prisma generate
```
