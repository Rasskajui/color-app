import './Color.css';
import ColorButton from '../ColorButton/ColorButton';
import { useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { hslToHex, hslToRgb } from '../../utils/colorFormatConverter';

function Color(props) {

    const colorHSL = `hsl(${props.color[0]}, ${props.color[1]}%, ${props.color[2]}%)`;

    const options = [
        hslToHex(...props.color), 
        colorHSL, 
        hslToRgb(props.color[0], props.color[1] / 100, props.color[2] / 100)
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handlePcikColor = () => {
        
    }

    const handleDeleteColor = () => {
        
    }

    const handleLockColor = () => {
        
    }

    const handleMoveColor = () => {
        
    }

    return (
        <li className="palette__color-item">
            <div 
                className="palette__color" 
                style={{ background: colorHSL }}
            >
                <div className="palette__color-btns-wrapper">
                    <ColorButton 
                        type="pick"
                        color={props.color}
                        handleButtonClick={handlePcikColor}
                    />
                    <ColorButton 
                        type="delete"
                        handleButtonClick={handleDeleteColor}
                    />
                    <ColorButton 
                        type="lock"
                        handleButtonClick={handleLockColor}
                    />
                    <ColorButton 
                        type="move"
                        handleButtonClick={handleMoveColor}
                    />
                </div>
            </div>
            <CustomSelect 
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
        </li>
    );
} 

export default Color;