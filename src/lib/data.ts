import { Category, Product } from "@/types";

export const CATEGORIES: Category[] = [
    { id: 'coffee', label: 'Cà Phê' },
    { id: 'freeze', label: 'Freeze' },
    { id: 'tea', label: 'Trà' },
    { id: 'cake', label: 'Bánh Ngọt' },
    { id: 'food', label: 'Món Mặn' },
];

export const PRODUCTS: Product[] = [
    // --- COFFEE ---
    { id: 1, category: 'coffee', name: 'Phin Sữa Đá', price: 29000, displayPrice: '29.000đ', img: '/gallery/phin-sua-da.webp', tag: 'Best Seller' },
    { id: 2, category: 'coffee', name: 'Phin Đen Đá', price: 29000, displayPrice: '29.000đ', img: '/gallery/phin-den-da.webp', tag: '' },
    { id: 26, category: 'coffee', name: 'Phin Đen Nóng', price: 29000, displayPrice: '29.000đ', img: '/gallery/phin-den-nong.webp', tag: '' },
    { id: 3, category: 'coffee', name: 'Bạc Xỉu Đá', price: 29000, displayPrice: '29.000đ', img: '/gallery/bac-xiu.webp', tag: 'Must Try' },
    { id: 27, category: 'coffee', name: 'Bạc Xỉu Nóng', price: 29000, displayPrice: '29.000đ', img: '/gallery/bac-xiu-nong.webp', tag: '' },
    { id: 4, category: 'coffee', name: 'Cappuccino Đá', price: 55000, displayPrice: '55.000đ', img: '/gallery/cappuccino.webp', tag: '' },
    { id: 28, category: 'coffee', name: 'Cappuccino Nóng', price: 55000, displayPrice: '55.000đ', img: '/gallery/cappucino-nong.webp', tag: '' },
    { id: 5, category: 'coffee', name: 'Latte Đá', price: 55000, displayPrice: '55.000đ', img: '/gallery/latte.webp', tag: '' },
    { id: 29, category: 'coffee', name: 'Latte Nóng', price: 55000, displayPrice: '55.000đ', img: '/gallery/latte-nong.webp', tag: '' },
    { id: 6, category: 'coffee', name: 'Espresso', price: 35000, displayPrice: '35.000đ', img: '/gallery/espresso-nong.webp', tag: '' },
    { id: 21, category: 'coffee', name: 'Americano', price: 35000, displayPrice: '35.000đ', img: '/gallery/americano.webp', tag: '' },
    { id: 30, category: 'coffee', name: 'Caramel Macchiato', price: 59000, displayPrice: '59.000đ', img: '/gallery/caramel-macchiato.webp', tag: 'Sweet' },

    // --- FREEZE ---
    { id: 7, category: 'freeze', name: 'Freeze Trà Xanh', price: 59000, displayPrice: '59.000đ', img: '/gallery/freeze-tra-xanh.webp', tag: 'Best Seller' },
    { id: 8, category: 'freeze', name: 'Freeze Chocolate', price: 59000, displayPrice: '59.000đ', img: '/gallery/freeze-choco.webp', tag: '' },
    { id: 9, category: 'freeze', name: 'Cookies & Cream', price: 59000, displayPrice: '59.000đ', img: '/gallery/freeze-cookies.webp', tag: 'Kids Love' },
    { id: 10, category: 'freeze', name: 'Caramel Freeze', price: 59000, displayPrice: '59.000đ', img: '/gallery/freeze-caramel.webp', tag: '' },
    { id: 22, category: 'freeze', name: 'Classic Phin Freeze', price: 59000, displayPrice: '59.000đ', img: '/gallery/classic-phin-freeze.webp', tag: 'New' },
    { id: 23, category: 'freeze', name: 'Freeze Hạt Sen', price: 59000, displayPrice: '59.000đ', img: '/gallery/freeze-kem-may-dau-tam.webp', tag: '' },

    // --- TEA ---
    { id: 11, category: 'tea', name: 'Trà Sen Vàng', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-sen-vang.webp', tag: 'Signature' },
    { id: 12, category: 'tea', name: 'Trà Thạch Đào', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-thach-dao.webp', tag: 'Refreshing' },
    { id: 13, category: 'tea', name: 'Trà Thanh Đào', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-thanh-dao.webp', tag: '' },
    { id: 14, category: 'tea', name: 'Trà Thạch Vải', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-thach-vai.webp', tag: '' },
    { id: 24, category: 'tea', name: 'Trà Xanh Đậu Đỏ', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-xanh-dau-do.webp', tag: '' },
    { id: 25, category: 'tea', name: 'Trà Dâu Tằm', price: 45000, displayPrice: '45.000đ', img: '/gallery/tra-dau-tam.webp', tag: '' },

    // --- CAKE ---
    { id: 15, category: 'cake', name: 'Phô Mai Trà Xanh', price: 35000, displayPrice: '35.000đ', img: '/gallery/banh-pho-mai-tra-xanh.webp', tag: '' },
    { id: 16, category: 'cake', name: 'Mousse Cacao', price: 35000, displayPrice: '35.000đ', img: '/gallery/banh-mousse-ca-cao.webp', tag: '' },
    { id: 17, category: 'cake', name: 'Tiramisu', price: 35000, displayPrice: '35.000đ', img: '/gallery/banh-tiramisu.webp', tag: 'Yummy' },
    { id: 18, category: 'cake', name: 'Bánh Chuối', price: 29000, displayPrice: '29.000đ', img: '/gallery/banh-chuoi.webp', tag: '' },
    { id: 31, category: 'cake', name: 'Phô Mai Chanh Dây', price: 29000, displayPrice: '29.000đ', img: '/gallery/banh-pho-mai-chanh-day.webp', tag: 'Sour' },
    { id: 32, category: 'cake', name: 'Phô Mai Caramel', price: 35000, displayPrice: '35.000đ', img: '/gallery/banh-pho-mai-caramel.webp', tag: '' },
    { id: 33, category: 'cake', name: 'Sữa Chua Phô Mai', price: 35000, displayPrice: '35.000đ', img: '/gallery/banh-sua-chua-pho-mai.webp', tag: '' },
    { id: 34, category: 'cake', name: 'Bánh Choux', price: 19000, displayPrice: '19.000đ', img: '/gallery/banh-choux.webp', tag: '' },
    { id: 35, category: 'cake', name: 'Croissant', price: 29000, displayPrice: '29.000đ', img: '/gallery/banh-croisaint.webp', tag: '' },

    // --- FOOD ---
    { id: 19, category: 'food', name: 'Bánh Mì Thịt Nướng', price: 35000, displayPrice: '35.000đ', img: '/gallery/sub-sandwich.png', tag: 'VN Classic' },
    { id: 20, category: 'food', name: 'Pizza', price: 89000, displayPrice: '89.000đ', img: '/gallery/pizza.png', tag: '' },
    { id: 36, category: 'food', name: 'Burger', price: 49000, displayPrice: '49.000đ', img: '/gallery/burger.png', tag: '' },
    { id: 37, category: 'food', name: 'Cheese Burger', price: 59000, displayPrice: '59.000đ', img: '/gallery/cheese-burger.png', tag: '' },
    { id: 38, category: 'food', name: 'Gà Rán', price: 39000, displayPrice: '39.000đ', img: '/gallery/fried-chicken.png', tag: '' },
    { id: 39, category: 'food', name: 'Mì Xào (Chowmein)', price: 45000, displayPrice: '45.000đ', img: '/gallery/chowmein.png', tag: '' },
    { id: 40, category: 'food', name: 'Beefsteak', price: 129000, displayPrice: '129.000đ', img: '/gallery/steak.png', tag: 'Premium' },
];
