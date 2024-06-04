import * as paletteGenerator from './paletteGenerator';

export const colorCodes = {
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
};

export const paletteTypes = {
    monochrome: 'Монохромная',
    analogue: 'Аналоговая',
    triade: 'Триада',
    complimentary: 'Комплементарная',
};

export const paletteGenerators = {
    'Монохромная': paletteGenerator.generateMonochromaticPalette,
    'Аналоговая': paletteGenerator.generateAnalogousPalette,
    'Триада': paletteGenerator.generateTriadicPalette,
    'Комплементарная': paletteGenerator.generateCompoundPalette,
};
