import './InfoTooltip.css';
import CheckIcon from '../../images/icons/info-check.svg';

function InfoTooltip({text, isOpened}) {
    return (
        <div className={`info-tooltip ${isOpened ? 'info-tooltip_opened' : ''}`}>
            <img src={ CheckIcon } alt="" className='info-tooltip__icon'/>
            <p className='info-tooltip__text'>{text}</p>
        </div>
    );
}

export default InfoTooltip;
