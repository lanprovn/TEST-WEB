import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCommunity() {
    console.log('🌱 Seeding Community data...');

    // Get or create a demo user
    let demoUser = await prisma.user.findFirst({
        where: { email: 'demo@highlands.com' }
    });

    if (!demoUser) {
        demoUser = await prisma.user.create({
            data: {
                name: 'Highlands Fan',
                email: 'demo@highlands.com',
                password: 'demo123',
                role: 'user'
            }
        });
    }

    // Create sample posts
    const posts = [
        {
            content: 'Sáng nay thử ly Phin Sữa Đá mới, ngon tuyệt vời! View ở đây đẹp quá mọi người ơi ☕️📸',
            image: '/gallery/hero-header.png',
            location: 'Highlands Nhà Thờ Đức Bà',
            userId: demoUser.id
        },
        {
            content: 'Freeze Trà Xanh vẫn là chân ái của mình. Ai team Freeze điểm danh nào! 🙋‍♂️',
            image: '/gallery/cta-two-bg.png',
            location: 'Highlands Vincom Center',
            userId: demoUser.id
        },
        {
            content: 'Bánh mì Highlands dạo này ngon xuất sắc! Vỏ giòn rụm, thịt nướng thơm phức 🥖☕',
            image: '/gallery/hero-bg.png',
            location: 'Highlands Landmark 81',
            userId: demoUser.id
        },
        {
            content: 'Không gian làm việc yên tĩnh, wifi nhanh. Đây là văn phòng thứ 2 của mình rồi 💻☕',
            image: '/gallery/hero-header.png',
            location: 'Highlands Thảo Điền',
            userId: demoUser.id
        }
    ];

    for (const postData of posts) {
        const post = await prisma.post.create({
            data: postData
        });

        // Add some likes
        const likeCount = Math.floor(Math.random() * 50) + 10;
        for (let i = 0; i < likeCount; i++) {
            try {
                await prisma.like.create({
                    data: {
                        userId: demoUser.id,
                        postId: post.id
                    }
                });
            } catch (e) {
                // Skip if duplicate
            }
        }

        // Add some comments
        const comments = [
            'Nhìn ngon quá! Mình cũng muốn thử 😍',
            'Địa điểm này view đẹp thật!',
            'Cà phê Highlands luôn đỉnh 👍',
            'Mình cũng hay đến đây, không gian tuyệt vời!'
        ];

        for (let i = 0; i < Math.min(3, comments.length); i++) {
            await prisma.comment.create({
                data: {
                    content: comments[i],
                    userId: demoUser.id,
                    postId: post.id
                }
            });
        }

        console.log(`✅ Created post: ${postData.content.substring(0, 50)}...`);
    }

    console.log('✨ Community seeding completed!');
}

seedCommunity()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
