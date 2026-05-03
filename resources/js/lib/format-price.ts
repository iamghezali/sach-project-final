/**
 * Formats a numeric or string value into a currency-style string
 * with comma separators and two decimal places.
 *  @param value - The price to format (e.g., 1234.5 or "1234.5")
 *  @returns A formatted string (e.g., "1,234.50")
 */
export function formatPrice(value: number | string): string {
    // Convert string to number if necessary
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        return '0.00';
    }

    const [integer, decimal] = numericValue.toFixed(2).split('.');

    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${formattedInteger}.${decimal}`;
}
