import { useState } from 'react';
import './CustomSelect.css';

function CustomSelect({selectedOption, setSelectedOption, options, className}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
            <div className={`select ${className} ${isOpen ? 'select_open' : ''}`}>
                <div className={`select-btn ${isOpen ? 'select-btn_open' : ''}`} onClick={() => {setIsOpen(!isOpen)}}>
                    {selectedOption}
                </div>
                {isOpen && <ul className="select__options">
                    {options.map((option) =>
                        <li key={option} className="select__option" onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                        }}>{option}</li>
                    )}
                </ul>}
            </div>
    );
};

export default CustomSelect;
