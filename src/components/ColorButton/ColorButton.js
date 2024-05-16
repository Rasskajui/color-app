import './ColorButton.css';
import Delete from '../../images/icons/delete.svg';
import Lock from '../../images/icons/lock.svg';
import Move from '../../images/icons/move.svg';
import { SketchPicker } from 'react-color';

function ColorButton(props) {

    const typeIcons = {
        'lock': Lock,
        'move': Move,
        'delete': Delete,
    }

    return (
        <button 
            className={`palette__color-btn ${props.type === 'move' ? 'palette__color-btn_accent' : '' } ${props.type === 'pick' ? 'palette__color-btn_pick' : '' }`}
            type='button'
            onClick={props.handleButtonClick}
            style={{
                gridArea: props.type
            }}
        >
            {
                props.type === 'pick' && 
                <>
                <div 
                    className='palette__color-btn-circle' 
                    style={{
                        backgroundColor: props.color
                    }}
                >
                </div>
                <div className={`palette__color-pick ${ props.isPickerOpen ? '' : 'palette__color-pick_hidden'}`}>
                    <SketchPicker
                        color={props.color}
                        onChange={(color) => {
                            props.setColor(color.hex);
                        }}
                    />
                </div>
                </>
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
    );
}

export default ColorButton;