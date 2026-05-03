// ============================================================================
// 📘 LESSON 04: Mongoose Pagination
// ============================================================================
//
// 🎯 WHY PAGINATION?
// ------------------
// If you have 1 million products, you can't show them all on one page. 
// It would crash the browser! 
// We show small chunks (e.g., 10 per page) and let the user click "Next".
//
// 🧠 LOGIC:
// - limit: How many items per page.
// - skip: How many items to skip from the start.
//   skip = (pageNumber - 1) * limit
// ============================================================================

const User = require('./02-mongoose-basics');

const getPaginatedUsers = async (page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;

        const users = await User.find()
            .sort({ createdAt: -1 }) // Show newest first
            .skip(skip)              // Skip previous pages
            .limit(limit);           // Get only 5 items

        const totalUsers = await User.countDocuments();

        console.log(`\n--- Page ${page} of Users ---`);
        console.log(`Showing ${users.length} of ${totalUsers} total users.`);
        
        users.forEach(u => console.log(`- ${u.username}`));

        return {
            users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit)
        };
    } catch (err) {
        console.error(err);
    }
};

// Example usage:
// getPaginatedUsers(1, 5); // Page 1
// getPaginatedUsers(2, 5); // Page 2
