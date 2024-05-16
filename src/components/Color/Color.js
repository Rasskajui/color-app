import './Color.css';
import ColorButton from '../ColorButton/ColorButton';
import { useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';

function Color(props) {

    const [color, setColor] = useState(props.color['HEX'].code);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const options = [
        props.color['HEX'].code,  
        props.color['RGB'].code,  
        props.color['HSL'].code,  
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleLockColor = () => {
        
    }

    const handleMoveColor = () => {
        
    }

    return (
        <li className="palette__color-item">
            <div 
                className="palette__color" 
                style={{ background: color }}
            >
                <div className="palette__color-btns-wrapper">
                    <ColorButton 
                        type="pick"
                        color={color}
                        setColor={setColor}
                        isPickerOpen={isPickerOpen}
                        handleButtonClick={() => {
                            setIsPickerOpen(!isPickerOpen)
                        }}
                    />
                    <ColorButton 
                        type="delete"   
                        handleButtonClick={props.handleDeleteColor}
                    />
                    <ColorButton 
                        type="lock"
                        handleButtonClick={handleLockColor}
                    />
                    <ColorButton 
                        type="move"
                        handleButtonClick={handleMoveColor}
                    />
                    <CustomSelect 
                        className={'palette__format-select'}
                        options={options}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                </div>
            </div>
        </li>
    );
} 

export default Color;