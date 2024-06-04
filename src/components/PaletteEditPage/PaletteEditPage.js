import './PaletteEditPage.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Palette from '../Palette/Palette';
import ArrowIcon from '../../images/icons/arrow-right.svg';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import { paletteGenerators } from '../../utils/constants'

function PaletteEditPage(props) {

    function handleNameChange(e) {
        e.preventDefault();
        props.setName(e.target.value);
    }

    function handleGeneratePalette(randomColor) {
        const newPalette = paletteGenerators[props.currentPaletteType](randomColor, 6);
        props.setCurrentPalette(newPalette);
        props.setColors(newPalette.slice(0, props.colorsCount));
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <section className={`edit ${props.isOpen ? 'edit_opened' : ''}`}>
            <div className='edit__head'>
                <a href='#!' onClick={() => setIsPopupOpen(true)} className='edit__link'>
                    <img src={ ArrowIcon } alt='' className='edit__link-icon'/>
                    <p className='edit__link-text'>Редактирование</p>
                </a>
                <button className='edit__save-btn' onClick={props.handleSavePaletteChanges}>Сохранить изменения</button>
            </div>
            <ButtonBar 
                currentPaletteColorCode={props.currentPaletteColorCode}
                setCurrentPaletteColorCode={props.setCurrentPaletteColorCode}
                currentPaletteType={props.currentPaletteType}
                setCurrentPaletteType={props.setCurrentPaletteType}
                currentPalette={props.currentPalette}
                setCurrentPalette={props.setCurrentPalette}
                loggedIn={true}
                savedPalettes={props.savedPalettes}
                setSavedPalettes={props.setSavedPalettes}
                handleGeneratePalette={handleGeneratePalette}
            />
            <form className='edit__name-form'>
                <label htmlFor='name' className='edit__name-label'>Название</label>
                <input 
                    type='text'
                    id='name'
                    name='name' 
                    className='edit__name-input'
                    value={props.name}
                    onChange={handleNameChange}
                    minLength={2}
                    maxLength={30}
                    required
                />
            </form>
            <Palette 
                currentPaletteColorCode={props.currentPaletteColorCode}
                currentPalette={props.currentPalette}
                setCurrentPalette={props.setCurrentPalette}
                colorsCount={props.colorsCount}
                setColorsCount={props.setColorsCount}
                colors={props.colors}
                setColors={props.setColors}
            />

            <Popup 
                title='Выйти без сохранения?'
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                children={
                    <div className='edit__btns'>
                        <button className='button edit__popup-btn' onClick={() => {
                            setIsPopupOpen(false);
                            props.onClose();
                        }}>Выйти</button>
                        <button className='button edit__popup-btn edit__cancel-button' onClick={() => setIsPopupOpen(false)}>Отменить</button>
                    </div>
                }
            />
        </section>
    )
}

export default PaletteEditPage;