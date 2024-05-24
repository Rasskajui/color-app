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

function ButtonBar({
    currentPaletteColorCode, 
    setCurrentPaletteColorCode, 
    currentPaletteType, 
    setCurrentPaletteType
}) {

    const paletteFormattedToExport = [
        {
            id: 1,
            title: 'Список',
            text: '#ffeae3, #9dacfd, #ffdad9, #ffd3d4, #ffcbd0, #ffc3cb'
        },
        {
            id: 2,
            title: 'Массив',
            text: '["#ffeae3", "#9dacfd", "#ffdad9", "#ffd3d4", "#ffcbd0", "#ffc3cb"]'
        },
        {
            id: 3,
            title: 'JSON',
            text: '   "name": "Палитра 1"  "colors": [    {      "color": "black",      "code": {        "rgba": [255,255,255,1],        "hex": "#000"      }...'
        },
    ]

    const [selectedPaletteType, setSelectedPaletteType] = useState(currentPaletteType);
    const [selectedColorFormat, setSelectedColorFormat] = useState(currentPaletteColorCode);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const handleSelectColorCode = (option) => {
        setSelectedColorFormat(option);
        setCurrentPaletteColorCode(option);
    }

    const handleSelectPaletteType = (option) => {
        setSelectedPaletteType(option);
        setCurrentPaletteType(option);
    }

    const handleOpenExportPopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    const handleCloseExportPopup = () => {
        setIsPopupOpen(false);
    }

    const showInfoTooltip = () => {
        setIsInfoTooltipOpen(true);
        setTimeout(() => setIsInfoTooltipOpen(false), 2000);
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
            <button className='button-bar__button button button_accent'>
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
            <button className='button-bar__button button'>
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
                                showMessage={showInfoTooltip}
                            />
                        )}
                    </ul>
                )}
            />

            <InfoTooltip 
                text={'Палитра скопирована'}
                isOpened={isInfoTooltipOpen}
            />
        </div>
    );
}

export default ButtonBar;