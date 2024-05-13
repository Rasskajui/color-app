import './ButtonBar.css';
import CustomSelect from '../CustomSelect/CustomSelect';
import { useState } from 'react';
import ExportIcon from '../../images/icons/export.svg';
import GenerateIcon from '../../images/icons/generate.svg';
import HeartIcon from '../../images/icons/heart.svg';
import SelectsIcon from '../../images/icons/settings.svg';

function ButtonBar() {

    const paletteTypeOptions = [
        'Монохромная',
        'Аналоговая',
        'Триада',
        'Комплементарная'
    ]

    const colorFormatOptions = [
        'HEX',
        'RGB',
        'HSL'
    ]

    const [selectedPaletteType, setSelectedPaletteType] = useState(paletteTypeOptions[0]);
    const [selectedColorFormat, setSelectedColorFormat] = useState(colorFormatOptions[0]);

    return (
        <div className='button-bar'>
            <input type="checkbox" id="selects-check" className="button-bar__select-check"/>
            <label htmlFor="selects-check" className="button-bar__select-btn button">
                <img src={SelectsIcon} alt="" className='button-bar__btn-icon'/>
            </label>
            <div className='button-bar__selects'>
                <CustomSelect 
                    options={paletteTypeOptions}
                    selectedOption={selectedPaletteType}
                    setSelectedOption={setSelectedPaletteType}
                    className={'button-bar__select'}
                    selectType={'menu'}
                />
                <CustomSelect 
                    options={colorFormatOptions}
                    selectedOption={selectedColorFormat}
                    setSelectedOption={setSelectedColorFormat}
                    className={'button-bar__select'}
                    selectType={'menu'}
                />
            </div>
            <button className='button-bar__button button button_accent'>
                <img src={GenerateIcon} alt="" className='button-bar__btn-icon'/>
                Сгенерировать&nbsp;палитру
            </button>
            <button className='button-bar__button button-bar__button_visible-text button'>
                <img src={ExportIcon} alt="" className='button-bar__btn-icon'/>
                Экспорт
            </button>
            <button className='button-bar__button button'>
                <img src={HeartIcon} alt="" className='button-bar__btn-icon'/>
            </button>
        </div>
    );
}

export default ButtonBar;