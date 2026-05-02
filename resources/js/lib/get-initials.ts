/**
 * Takes a full name and returns the first and last initials in uppercase.
 * @param {string} name - The full name to process.
 * @returns {string} The formatted initials (e.g., "JD").
 */

export const getInitials = (name: string): string => {
    if (!name || typeof name !== 'string') {
        return '';
    }

    // 1. Trim whitespace and split by spaces
    const parts = name.trim().split(/\s+/);

    if (parts.length === 0) {
        return '';
    }

    // 2. If only one name exists, return its first letter
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    // 3. Grab the first and last elements
    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
};
