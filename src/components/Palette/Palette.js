import { useState } from "react";
import './Palette.css';
import Color from "../Color/Color";

function Palette({
    currentPaletteColorCode, 
    currentPalette, 
    setCurrentPalette, 
    colorsCount, 
    setColorsCount,
    colors,
    setColors,
}) {

    const handleDeleteColor = (id) => {
        setColorsCount(colorsCount - 1);
        setColors((prevState) => prevState.filter((e) => e.id !== id ));
    }

    const [currentDraggedColor, setCurrentDraggedColor] = useState(null);

    function dragStartHandler(e, color) {
        setCurrentDraggedColor(color);
    }

    function dragEndHandler(e) {

    }
    
    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e, color) {
        e.preventDefault();
        setColors(colors.map(c => {
            if (c.id === color.id) {
                return {...c, order: currentDraggedColor.order}
            }
            if (c.id === currentDraggedColor.id) {
                return {...c, order: color.order}
            }
            return c;
        }));
        setCurrentPalette(currentPalette.map(c => {
            if (c.id === color.id) {
                return {...c, order: currentDraggedColor.order}
            }
            if (c.id === currentDraggedColor.id) {
                return {...c, order: color.order}
            }
            return c;
        }).sort((a, b) => a.order > b.order ? 1 : -1));
    }

    return (
        <div className="palette">
            <ul className="palette__colors">
                {colors.sort((a, b) => a.order > b.order ? 1 : -1).map((color) => 
                <Color
                    key={color.id}
                    color={color}
                    colors={colors}
                    handleDeleteColor={() => handleDeleteColor(color.id)}
                    currentPaletteColorCode={currentPaletteColorCode}
                    currentPalette={currentPalette}
                    setCurrentPalette={setCurrentPalette}

                    dragStartHandler={dragStartHandler}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                />)}
                {colorsCount < 6 && <button 
                    className="palette__button" 
                    type="button" 
                    aria-label="Добавить цвет"
                    onClick={() => {
                        setColorsCount(colorsCount + 1);
                        const ids = colors.map((c) => c.id);
                        let nextColor = currentPalette.find((c) => !ids.includes(c.id));
                        nextColor.order = colorsCount;
                        setColors([...colors, nextColor])
                    }}
                ></button>}
            </ul>
        </div>
    );
}

export default Palette;
