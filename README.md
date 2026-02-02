# ☕ Highlands Coffee - E-commerce Web Application

> Modern, full-featured e-commerce platform built with Next.js 15, featuring a complete shopping experience with community social feed.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC)

## ✨ Features

### 🛒 E-Commerce Core
- **Product Catalog** with categories (Coffee, Freeze, Tea, Pastries)
- **Shopping Cart** with real-time updates
- **Checkout System** with multiple payment methods (COD, Banking)
- **Order Management** with status tracking
- **Product Reviews** with ratings

### 👥 Community & Social
- **Social Feed** with posts, likes, and comments
- **User Profiles** with avatars and verified badges
- **Trending Hashtags** and top contributors
- **Real-time Interactions** (Like/Unlike, Comment)

### 🎨 Modern UI/UX
- **Responsive Design** optimized for all devices
- **Dark Mode** support
- **Smooth Animations** with Framer Motion
- **Professional Design** with Shadcn/ui components
- **Image Optimization** with Next.js Image

### 🔐 Authentication & Authorization
- **NextAuth.js** integration
- **Role-based Access** (Admin/User)
- **Secure Sessions** with JWT

### 📊 Admin Dashboard
- **Order Management** with status updates
- **Product Management** (CRUD operations)
- **Sales Analytics** with key metrics
- **User Management**

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: NextAuth.js
- **API**: Next.js Server Actions

### DevOps
- **Deployment**: Vercel
- **Database Hosting**: Supabase / Vercel Postgres
- **Version Control**: Git + GitHub

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended)

### 1. Clone Repository
```bash
git clone https://github.com/lanprovn/TEST-WEB.git
cd TEST-WEB/shop-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.postgresql.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 4. Setup Database
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database with sample data
npx tsx prisma/seed.ts
npx tsx prisma/seed-community.ts
npx tsx prisma/create-test-user.ts
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🔑 Test Accounts

### User Account
- **Email**: `test@test.com`
- **Password**: `test123`

### Admin Account
- **Email**: `admin@highlands.com`
- **Password**: `admin123`

## 📁 Project Structure

```
shop-app/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts               # Seed scripts
├── public/
│   └── gallery/              # Product images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (pages)/         # Page routes
│   │   ├── actions/         # Server Actions
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── ui/              # Shadcn/ui components
│   │   ├── layout/          # Layout components
│   │   ├── product/         # Product components
│   │   ├── community/       # Community components
│   │   └── admin/           # Admin components
│   ├── lib/                 # Utilities
│   └── types/               # TypeScript types
├── .env.example             # Environment template
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub** (already done!)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Add Environment Variables**
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Deploy!**
   - Vercel will auto-deploy on every push to `main`

### Database Setup for Production

See detailed guide: [SETUP-POSTGRESQL.md](./SETUP-POSTGRESQL.md)

## 📚 Documentation

- [PostgreSQL Setup Guide](./SETUP-POSTGRESQL.md)
- [Migration Guide](./MIGRATE-TO-POSTGRESQL.md)
- [Deployment Guide](./DEPLOY.md)

## 🎯 Key Features Breakdown

### Product Management
- Dynamic product catalog with categories
- Advanced search and filtering
- Product detail pages with reviews
- Related products recommendations

### Shopping Experience
- Real-time cart updates
- Multiple payment methods
- Order tracking
- Order history

### Community Features
- Create posts with images and location
- Like/Unlike posts
- Comment on posts
- Trending hashtags
- Top contributors leaderboard

### Admin Panel
- Dashboard with analytics
- Order management
- Product CRUD operations
- User management

## 🔧 Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run migrations
npx prisma generate  # Generate Prisma Client

# Linting
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Nguyễn Triệu Kim Oanh**

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/)

---

**⭐ If you like this project, please give it a star on GitHub!**
