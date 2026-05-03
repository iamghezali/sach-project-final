export function formatPrice(value: number): string {
    const [integer, decimal] = value.toFixed(2).split('.');
    const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${formatted}.${decimal}`;
}
