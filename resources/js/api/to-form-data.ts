export function toFormData(data: unknown, form = new FormData(), parentKey = ''): FormData {
    if (data instanceof File) {
        form.append(parentKey.replace(/\[\d+\]$/, '[]'), data);
    } else if (Array.isArray(data)) {
        data.forEach((item, index) => {
            toFormData(item, form, parentKey ? `${parentKey}[${index}]` : String(index));
        });
    } else if (data !== null && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
            toFormData(value, form, parentKey ? `${parentKey}[${key}]` : key);
        });
    } else if (data !== null && data !== undefined) {
        const scalar = typeof data === 'boolean' ? (data ? '1' : '0') : String(data);
        form.append(parentKey, scalar);
    }

    return form;
}
