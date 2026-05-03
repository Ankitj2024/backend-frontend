// ============================================================================
// 📘 LESSON 05B: LOCAL MODULES — Another Module (String Utilities)
// ============================================================================
// This module shows a DIFFERENT style of exporting: using `exports` directly.
// ============================================================================

/**
 * Capitalizes the first letter of a string
 * @param {string} str - Input string
 * @returns {string} String with first letter capitalized
 */
exports.capitalize = function(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Reverses a string
 * @param {string} str - Input string
 * @returns {string} Reversed string
 */
exports.reverse = function(str) {
    return str.split("").reverse().join("");
};

/**
 * Counts words in a string
 * @param {string} str - Input string
 * @returns {number} Number of words
 */
exports.countWords = function(str) {
    return str.trim().split(/\s+/).length;
};

/**
 * Truncates a string to a given length and adds "..."
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated string
 */
exports.truncate = function(str, maxLength = 50) {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...";
};

// ============================================================================
// NOTE: We used `exports.functionName` here (adding properties one by one)
// This is equivalent to:
//   module.exports = { capitalize, reverse, countWords, truncate };
//
// Both styles work. Use whichever you prefer, but be CONSISTENT in a project.
// ============================================================================
