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

export const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex);

    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return {
        code: `hsl(${h}, ${s}, ${l})`,
        h: h,
        s: s,
        l: l
    };
}