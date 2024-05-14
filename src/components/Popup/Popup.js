import './Popup.css';
import { useEffect, useRef } from 'react';

function Popup(props) {

    const popupArea = useRef(null);
    const { onClose } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupArea.current && !popupArea.current.contains(event.target)) {
            onClose();
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClose ]);

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__content' ref={popupArea}>
                <div className='popup__head'>
                    <h2 className='popup__title'>{props.title}</h2>
                    <button className='popup__close-btn' type='button' onClick={props.onClose}></button>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default Popup;
