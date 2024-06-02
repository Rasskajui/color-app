import './Color.css';
import ColorButton from '../ColorButton/ColorButton';
import { useEffect, useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { hexToHsl, hexToRgb } from '../../utils/colorFormatConverter';

function Color(props) {

    const [colorHEX, setColorHEX] = useState(props.color['HEX'].code);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const [options, setOptions] = useState({
        'HEX': props.color['HEX'].code,  
        'RGB': props.color['RGB'].code,  
        'HSL': props.color['HSL'].code,  
    });

    const [selectedOptionCode, setSelectedOptionCode] = useState(props.currentPaletteColorCode);
    const [selectedOption, setSelectedOption] = useState(options[selectedOptionCode]);

    useEffect(() => {
        setSelectedOption(options[props.currentPaletteColorCode]);
    }, [props.currentPaletteColorCode, options]);

    useEffect(() => {
        options['HEX'] = colorHEX;
        options['RGB'] = hexToRgb(colorHEX).code;
        options['HSL'] = hexToHsl(colorHEX).code;
        setSelectedOption(options[selectedOptionCode]);
    }, [colorHEX, options, selectedOptionCode]);


    const [isDraggable, setIsDraggable] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const handleMoveColor = () => {
        setIsDraggable(true);
    }

    const handleLockColorClick = () => {
        setIsLocked(!isLocked);
    }

    return (
        <li 
            className="palette__color-item"
            draggable={isDraggable}
            onDragStart={(e) => props.dragStartHandler(e, props.color)}
            onDragLeave={(e) => props.dragEndHandler(e)}
            onDragEnd={(e) => props.dragEndHandler(e)}
            onDragOver={(e) => props.dragOverHandler(e)}
            onDrop={(e) => props.dropHandler(e, props.color)}
        >
            <div 
                className="palette__color" 
                style={{ background: colorHEX }}
            >
                <div className="palette__color-btns-wrapper">
                    <ColorButton 
                        type="pick"
                        color={colorHEX}
                        setColor={setColorHEX}
                        isPickerOpen={isPickerOpen}
                        onPickerClose={() => setIsPickerOpen(false)}
                        handleButtonClick={() => {
                            setIsPickerOpen(!isPickerOpen)
                        }}
                        currentPalette={props.currentPalette}
                        setCurrentPalette={props.setCurrentPalette}
                        colorId={props.color.id}
                    />
                    <ColorButton 
                        type="delete"   
                        handleButtonClick={props.handleDeleteColor}
                    />
                    <ColorButton 
                        type="lock"
                        handleButtonClick={handleLockColorClick}
                        isLocked={isLocked}
                    />
                    <ColorButton 
                        type="move"
                        handleButtonClick={handleMoveColor}
                    />
                    <CustomSelect 
                        className={'palette__format-select'}
                        options={Object.values(options)}
                        selectedOption={selectedOption}
                        setSelectedOption={(option) => {
                            setSelectedOptionCode(Object.keys(options).find(key => options[key] === option)); 
                            setSelectedOption(option);
                        }}
                    />
                </div>
            </div>
        </li>
    );
} 

export default Color;