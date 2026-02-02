
import { PrismaClient } from '@prisma/client'
import { PRODUCTS } from './data'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    try {
        await prisma.orderItem.deleteMany()
        await prisma.order.deleteMany()
        await prisma.product.deleteMany()
        await prisma.user.deleteMany()
    } catch (e) {
        console.log('Clean up error:', e)
    }

    // Seed Products
    for (const p of PRODUCTS) {
        const product = await prisma.product.create({
            data: {
                id: p.id,
                name: p.name,
                category: p.category,
                price: p.price,
                displayPrice: p.displayPrice,
                img: p.img,
                tag: p.tag,
                description: p.description,
            }
        })
        console.log(`Created product with id: ${product.id}`)
    }

    // Seed Demo User
    await prisma.user.create({
        data: {
            name: 'Khách Hàng Demo',
            email: 'demo@highlands.com',
            password: '123456',
            role: 'user',
        }
    })
    console.log('Created demo user')

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
