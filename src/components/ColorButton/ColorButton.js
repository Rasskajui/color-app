import './ColorButton.css';
import Delete from '../../images/icons/delete.svg';
import Lock from '../../images/icons/lock.svg';
import Move from '../../images/icons/move.svg';
import { SketchPicker } from 'react-color';
import { useRef, useEffect } from 'react';
import { hexToHsl } from '../../utils/colorFormatConverter';

function ColorButton(props) {
    
    const colorPickArea = useRef(null);
    const { onPickerClose } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            colorPickArea.current 
            && !colorPickArea.current.contains(event.target)
            && !event.target.className.includes('palette__color-btn_pick')
            && !event.target.className.includes('palette__color-btn-circle')
            ) {
            onPickerClose();    
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [onPickerClose]);

    const typeIcons = {
        'lock': Lock,
        'move': Move,
        'delete': Delete,
    }

    return (
        <div 
            className='palette__color-btn-wrapper' 
            style={{
                gridArea: props.type
            }}
        >
        <button 
            className={`palette__color-btn ${props.type === 'move' ? 'palette__color-btn_accent' : '' } ${props.type === 'pick' ? 'palette__color-btn_pick' : '' }`}
            type='button'
            onClick={props.handleButtonClick}
        >
            {
                props.type === 'pick' && 
                <div 
                    className='palette__color-btn-circle' 
                    style={{
                        backgroundColor: props.color
                    }}
                >
                </div>
            }
            {
                props.type !== 'pick' && 
                <img 
                    className='palette__color-btn-icon' 
                    src={typeIcons[props.type]}
                    alt={typeIcons[props.type] + ' the color'}
                ></img>
            }
        </button>
        {props.type === 'pick' && 
        <div 
            ref={colorPickArea} 
            className={`palette__color-pick ${ props.isPickerOpen ? '' : 'palette__color-pick_hidden'}`
        }>
            <SketchPicker
                color={props.color}
                onChange={(color) => {
                    props.setColor(color.hex);
                }}
                onChangeComplete={(color) => {
                    props.setCurrentPalette(props.currentPalette.map((e) => 
                        e.id === props.colorId ? {
                            id: e.id,
                            'HSL': hexToHsl(color.hex),
                            'HEX': {code: color.hex},
                            'RGB': {
                                code: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b},)`,
                                r: color.rgb.r,
                                g: color.rgb.g,
                                b: color.rgb.b,
                            }
                        } : e
                    ))
                }}
            />
        </div>}
        </div>
    );
}

export default ColorButton;