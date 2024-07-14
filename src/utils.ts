export function validateHex(hexStr:string): boolean {
    return !!hexStr && /[a-f\d]{6}/i.test(hexStr)
}

export function convertToRGB(hexStr:string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : null;
}

export function formatRGB(array: number[] | null): string {
    return array ? `RGB(${array[0]}, ${array[1]}, ${array[2]})` : ""
}