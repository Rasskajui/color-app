import { useState } from 'react';
import './CustomSelect.css';

function CustomSelect({selectedOption, setSelectedOption, options, className, selectType}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${className}`}>
            <div className={`select ${isOpen ? 'select_open' : ''} ${selectType === 'menu' ? 'select_menu' : ''}`}>
                <div 
                    className={
                        `select-btn 
                        ${isOpen ? 'select-btn_open' : ''} 
                        `
                    } 
                    onClick={() => {setIsOpen(!isOpen)}}
                >
                    {selectedOption}
                </div>
                {isOpen && <ul className={`select__options ${selectType === 'menu' ? 'select__options_menu' : ''}`}>
                    {options.map((option) =>
                        option !== selectedOption && <li key={option} className="select__option" onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                        }}>{option}</li>
                    )}
                </ul>}
            </div>
        </div>
    );
};

export default CustomSelect;
