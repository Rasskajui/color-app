import { useState } from "react";
import './Palette.css';
import Color from "../Color/Color";
import CurrentPaletteContext from "../../contexts/CurrentPaletteContext";
import { useContext } from "react";

function Palette({currentPaletteColorCode}) {
    const currentPaletteSettings = useContext(CurrentPaletteContext);
    const palette = currentPaletteSettings.palette;

    const [colorsCount, setColorsCount] = useState(3);
    const [colors, setColors] = useState(palette.slice(0, colorsCount));

    const handleDeleteColor = (inx) => {
        setColors((prevState) => prevState.filter((e, i) => i !== inx ))
    }

    return (
        <div className="palette">
            <ul className="palette__colors">
                {colors.map((color, colorInx) => 
                <Color
                    key={colorInx}
                    color={color}
                    colors={colors}
                    handleDeleteColor={() => handleDeleteColor(colorInx)}
                    currentPaletteColorCode={currentPaletteColorCode}
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
