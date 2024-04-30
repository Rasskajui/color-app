import './ColorButton.css';
import Delete from '../../images/icons/delete.svg';
import Lock from '../../images/icons/lock.svg';
import Move from '../../images/icons/move.svg';

function ColorButton(props) {

    const typeIcons = {
        'lock': Lock,
        'move': Move,
        'delete': Delete,
    }

    return (
        <button 
            className='palette__color-btn'
            type='button'
            onClick={props.handleButtonClick}
        >
            {
                props.type === 'pick' && 
                <div 
                    className='palette__color-btn-circle' 
                    style={{
                        backgroundColor: `hsl(${props.color[0]}, ${props.color[1]}%, ${props.color[2]}%)`
                    }}
                ></div>
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