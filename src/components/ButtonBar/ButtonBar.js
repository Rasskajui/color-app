import './ButtonBar.css';
import CustomSelect from '../CustomSelect/CustomSelect';
import { useState } from 'react';
import ExportIcon from '../../images/icons/export.svg';
import GenerateIcon from '../../images/icons/generate.svg';
import HeartIcon from '../../images/icons/heart.svg';
import SelectsIcon from '../../images/icons/settings.svg';
import Popup from '../Popup/Popup';
import PaletteFormat from '../PaletteFormat/PaletteFormat';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { colorCodes, paletteTypes } from '../../utils/constants';
import * as paletteApi from '../../utils/paletteApi';

function ButtonBar({
    currentPaletteColorCode, 
    setCurrentPaletteColorCode, 
    currentPaletteType, 
    setCurrentPaletteType,
    currentPalette,
    loggedIn,
    savedPalettes,
    setSavedPalettes,
    handleGeneratePalette
}) {

    const formatPaletteText = (palette,  toAddReg = ', ', start = '', toAddLast = '', code = 'HEX') => {
        return palette.reduce((prev, color, inx) => {
            let toAdd = inx + 1 === currentPalette.length ? toAddLast : toAddReg;
            let colorString = code === 'HEX' ? color[code].code : JSON.stringify(color);
            return prev + colorString + toAdd;
        }, start)
    }

    const args = {
        list: [],
        array: [', ', '[', ']'],
        JSON: [',\n\t\t', '{\n\t"colors":[\n\t\t', '\n\t]\n}', 'JSON']
    };

    const [paletteFormattedToExport, setPaletteFormattedToExport] = useState([
        {
            id: 1,
            title: 'Список',
            type: 'list',
            text: formatPaletteText(currentPalette, ...args.list),
        },
        {
            id: 2,
            title: 'Массив',
            type: 'array',
            text: formatPaletteText(currentPalette, ...args.array),
        },
        {
            id: 3,
            title: 'JSON',
            type: 'JSON',
            text: formatPaletteText(currentPalette, ...args.JSON),
        },
    ]);

    const [selectedPaletteType, setSelectedPaletteType] = useState(currentPaletteType);
    const [selectedColorFormat, setSelectedColorFormat] = useState(currentPaletteColorCode);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipText, setInfoTooltipText] = useState('');

    const handleSelectColorCode = (option) => {
        setSelectedColorFormat(option);
        setCurrentPaletteColorCode(option);
    }

    const handleSelectPaletteType = (option) => {
        setSelectedPaletteType(option);
        setCurrentPaletteType(option);
    }

    const handleOpenExportPopup = () => {
        setPaletteFormattedToExport(paletteFormattedToExport.map((e) => {
            e.id += paletteFormattedToExport.length;
            e.text = formatPaletteText(currentPalette, ...args[e.type]); 
            return e;
        }));
        setIsPopupOpen(!isPopupOpen);
    }

    const handleCloseExportPopup = () => {
        setIsPopupOpen(false);
    }

    const showInfoTooltip = (text) => {
        setInfoTooltipText(text);
        setIsInfoTooltipOpen(true);
        setTimeout(() => setIsInfoTooltipOpen(false), 2000);
    }


    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [paletteNameValue, setPaletteNameValue] = useState('');

    function handleOpenSavePopup() {
        loggedIn 
        ? setIsSavePopupOpen(true)
        : showInfoTooltip('Необходима авторизация')
    }

    function handleCloseSavePopup() {
        setIsSavePopupOpen(false);
    }

    function handleSavePalette(e) {
        e.preventDefault();
        paletteApi.savePalette({
            name: paletteNameValue,
            colors: currentPalette.map(c => JSON.stringify(c)),
        })
        .then((res) => {
            showInfoTooltip('Палитра сохранена')
            handleCloseSavePopup();
            setSavedPalettes([...savedPalettes, res]);
            console.log(savedPalettes);
        })
        .catch(err => {
            showInfoTooltip(err)
        })
    }

    function handlePaletteNameChange(e) {
        setPaletteNameValue(e.target.value);
        checkPaletteNameErrors();
    }

    const [isSavePaletteBtnDisabled, setIsSavePaletteBtnDisabled] = useState(true);

    const checkPaletteNameErrors = () => {
        setIsSavePaletteBtnDisabled(!(paletteNameValue.length >= 2 && paletteNameValue.length <= 30))
    }

    return (
        <div className='button-bar'>
            <input type="checkbox" id="selects-check" className="button-bar__select-check"/>
            <label htmlFor="selects-check" className="button-bar__select-btn button">
                <img src={SelectsIcon} alt="" className='button-bar__btn-icon'/>
            </label>
            <div className='button-bar__selects'>
                <CustomSelect 
                    options={Object.values(paletteTypes)}
                    selectedOption={selectedPaletteType}
                    setSelectedOption={handleSelectPaletteType}
                    className={'button-bar__select'}
                    selectType={'menu'}
                />
                <CustomSelect 
                    options={Object.values(colorCodes)}
                    selectedOption={selectedColorFormat}
                    setSelectedOption={handleSelectColorCode}
                    className={'button-bar__select'}
                    selectType={'menu'}
                />
            </div>
            <button 
                className='button-bar__button button button_accent' 
                onClick={() => handleGeneratePalette([Math.random() * 360, 60, 60])}
            >
                <img src={GenerateIcon} alt="" className='button-bar__btn-icon'/>
                Сгенерировать&nbsp;палитру
            </button>
            <button 
                className='button-bar__button button-bar__button_visible-text button' 
                onClick={handleOpenExportPopup}
            >
                <img src={ExportIcon} alt="" className='button-bar__btn-icon'/>
                Экспорт
            </button>
            <button className='button-bar__button button' onClick={handleOpenSavePopup}>
                <img src={HeartIcon} alt="" className='button-bar__btn-icon'/>
            </button>

            <Popup 
                isOpen={isPopupOpen}
                onClose={handleCloseExportPopup}
                title={'Экспорт палитры'}
                children={(
                    <ul className='popup__list'>
                        {paletteFormattedToExport.map(el => 
                            <PaletteFormat
                                key={el.id}
                                text={el.text}
                                title={el.title}
                                showMessage={() =>  showInfoTooltip('Палитра скопирована')}
                            />
                        )}
                    </ul>
                )}
            />

            <InfoTooltip 
                text={infoTooltipText}
                isOpened={isInfoTooltipOpen}
            />

            <Popup
                isOpen={isSavePopupOpen}
                onClose={handleCloseSavePopup}
                title={'Сохранить палитру'}
                children={(
                    <form className='popup__form' onSubmit={handleSavePalette}>
                        <input 
                            className='form__input' 
                            placeholder='Введите название палитры'
                            onChange={handlePaletteNameChange}
                            value={paletteNameValue}
                            minLength="2" 
                            maxLength="30" 
                            required
                        />
                        <button 
                            type='submit' 
                            className={`form__submit-btn ${isSavePaletteBtnDisabled ? 'form__submit-btn_disabled' : ''}`}
                            disabled={isSavePaletteBtnDisabled}
                        >Сохранить</button>
                    </form>
                )}
            />
        </div>
    );
}

export default ButtonBar;