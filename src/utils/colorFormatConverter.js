export const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return {code: `#${f(0)}${f(8)}${f(4)}`};
}

export const hexToRgb = (hex) => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(res[1], 16);
    const g = parseInt(res[2], 16);
    const b = parseInt(res[3], 16);
    return {
        code: `rgb(${r}, ${g}, ${b})`,
        r: r,
        g: g,
        b: b,
    };
}   

export const hslToRgb = (h, s, l) => hexToRgb(hslToHex(h, s, l).code)