import './Color.css';
import ColorButton from '../ColorButton/ColorButton';
import { useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { hslToHex, hslToRgb } from '../../utils/colorFormatConverter';

function Color(props) {

    const options = [
        hslToHex(...props.color), 
        `hsl(${props.color[0]}, ${props.color[1]}%, ${props.color[2]}%)`, 
        hslToRgb(props.color[0], props.color[1] / 100, props.color[2] / 100)
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <li className="palette__color-item">
            <div className="palette__color" style={{ background: `hsl(${props.color[0]}, ${props.color[1]}%, ${props.color[2]}%)` }}>
                <div className="palette__color-btns-wrapper">
                    <ColorButton 
                        type=""
                        onClick={() => {}}
                    />
                    <ColorButton 
                        type=""
                        onClick={() => {}}
                    />
                    <ColorButton 
                        type=""
                        onClick={() => {}}
                    />
                    <ColorButton 
                        type=""
                        onClick={() => {}}
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