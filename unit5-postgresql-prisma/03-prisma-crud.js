// ============================================================================
// 📘 LESSON 03: CRUD with Prisma ORM
// ============================================================================
//
// 🎯 WHY PRISMA?
// ---------------
// 1. Type Safety: It knows the exact shape of your data.
// 2. Auto-completion: Your IDE will help you write queries.
// 3. Migrations: It manages changes to your database structure.
// ============================================================================

// NOTE: To use this code, you normally run:
// 1. npm install @prisma/client
// 2. npx prisma generate
// 3. npx prisma migrate dev

// --- MOCK PRISMA CLIENT DEMO ---
// (This is how the code would look)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // --- 1. CREATE ---
        console.log("--- Creating User and Post ---");
        const newUser = await prisma.user.create({
            data: {
                name: 'Ajit',
                email: 'ajit@example.com',
                posts: {
                    create: { title: 'Learning Prisma is fun!' }
                }
            }
        });
        console.log("✅ Created User with ID:", newUser.id);

        // --- 2. READ (with Relationship) ---
        console.log("\n--- Fetching Users with their Posts ---");
        const allUsers = await prisma.user.findMany({
            include: { posts: true } // This is like an SQL JOIN!
        });
        console.dir(allUsers, { depth: null });

        // --- 3. UPDATE ---
        console.log("\n--- Updating User ---");
        const updatedUser = await prisma.user.update({
            where: { email: 'ajit@example.com' },
            data: { age: 25 }
        });
        console.log("Updated User Age:", updatedUser.age);

        // --- 4. DELETE ---
        console.log("\n--- Deleting ---");
        // await prisma.post.deleteMany({ where: { authorId: 1 } });
        console.log("🗑️ Delete operation ready.");

    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

// main();

console.log("=== Prisma CRUD Example Logic Created ===");
