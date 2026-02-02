import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUser() {
    console.log('👤 Creating test user...');

    const hashedPassword = await bcrypt.hash('test123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            name: 'Test User',
            email: 'test@test.com',
            password: hashedPassword,
            role: 'user'
        }
    });

    console.log('✅ Test user created!');
    console.log('📧 Email: test@test.com');
    console.log('🔑 Password: test123');
    console.log('');
    console.log('🎉 You can now login and test the Community features!');
}

createTestUser()
    .catch((e) => {
        console.error('❌ Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
