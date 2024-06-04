import { hslToHex, hslToRgb } from "./colorFormatConverter";

const formatColor = (colorsHSL) => {
    return colorsHSL.map((color, inx) => {
        return {
            id: inx + Math.random() * 10000,
            order: inx,
            'HSL': {
                h: color[0],
                s: color[1],
                l: color[2],
                code: `hsl(${color[0]}, ${color[1]}, ${color[2]})`
            },
            'HEX': hslToHex(...color),
            'RGB': hslToRgb(...color),
        }
    });
}

export const generateMonochromaticPalette = (hsl, count) => {
    const palette = [];
    const [hue, saturation, lightness] = hsl;
    const dropPercent = Math.floor((100 / count));
    for (let i = 0; i < count; i++)
        palette.push([hue, saturation, (lightness + dropPercent * i) % 100])
    palette.sort((a, b) => b[2] - a[2]);
    return formatColor(palette);
}

export const generateAnalogousPalette = (hsl, count) => {
    const palette = [];
    const [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++)
        palette.push([(hue + 15 * i) % 360, saturation, lightness])
    palette.sort((a, b) => b[0] - a[0]);
    return formatColor(palette);
}

export const generateCompoundPalette = (hsl, count) => {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    palette.push(hsl);
    for (let i = 1; i < count; i++) {
        if (i % 2 !== 0) 
            hue = (hue + 180) % 360
        else
            hue = (hue + 30) % 360
        palette.push([hue, saturation, lightness])
    }
    palette.sort((a, b) => b[0] - a[0]);
    return formatColor(palette);
}

export const generateTriadicPalette = (hsl, count) => {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    palette.push(hsl);
    for (let i = 1; i < count; i++) {
        if (i % 3 !== 0)
            hue = (hue + 120) % 360
        else 
            hue = (hue + 30) % 360
        palette.push([hue, saturation, lightness])
    }
    return formatColor(palette);
}

export const generateRandomHexColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
} 