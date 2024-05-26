import { useState } from "react";
import './Palette.css';
import Color from "../Color/Color";

function Palette({currentPaletteColorCode, currentPalette, setCurrentPalette}) {
    const [colorsCount, setColorsCount] = useState(3);
    const [colors, setColors] = useState(currentPalette.slice(0, colorsCount));

    const handleDeleteColor = (id) => {
        setColorsCount(colorsCount - 1);
        setColors((prevState) => prevState.filter((e) => e.id !== id ));
    }

    return (
        <div className="palette">
            <ul className="palette__colors">
                {colors.map((color) => 
                <Color
                    key={color.id}
                    color={color}
                    colors={colors}
                    handleDeleteColor={() => handleDeleteColor(color.id)}
                    currentPaletteColorCode={currentPaletteColorCode}
                    currentPalette={currentPalette}
                    setCurrentPalette={setCurrentPalette}
                />)}
                {colorsCount < 6 && <button 
                    className="palette__button" 
                    type="button" 
                    aria-label="Добавить цвет"
                    onClick={() => {
                        setColorsCount(colorsCount + 1);
                        setColors(currentPalette.slice(0, colorsCount + 1))
                    }}
                ></button>}
            </ul>
        </div>
    );
}

export default Palette;
