import { useState } from "react";
import { generateMonochromaticPalette } from "../../utils/paletteGenerator";
import './Palette.css';
import Color from "../Color/Color";

function Palette(props) {
    const [mainColor, setMainColor] = useState([Math.floor(Math.random() * 360), 60, 60]);
    const palette = generateMonochromaticPalette(mainColor, 6);

    const [colorsCount, setColorsCount] = useState(1);
    const [colors, setColors] = useState(palette.slice(0, colorsCount));

    return (
        <div className="palette">
            <ul className="palette__colors">
                {colors.map((color) => <Color
                    key={color}
                    color={color}
                />)}
                {colorsCount < 6 && <button 
                    className="palette__button" 
                    type="button" 
                    aria-label="Добавить цвет"
                    onClick={() => {
                        setColorsCount(colorsCount + 1);
                        setColors([...colors, palette[colors.length]])
                    }}
                ></button>}
            </ul>
        </div>
    );
}

export default Palette;
