import './Favourites.css';
import SearchIcon from '../../images/icons/search-normal.svg';
import CrossIcon from '../../images/icons/cross.svg';
import EditIcon from '../../images/icons/edit.svg';
import ExportIcon from '../../images/icons/export.svg';
import DeleteIcon from '../../images/icons/delete.svg';
import { useState } from 'react';
import * as paletteApi from '../../utils/paletteApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Popup from '../Popup/Popup';
import PaletteFormat from '../PaletteFormat/PaletteFormat';
import PaletteEditPage from '../PaletteEditPage/PaletteEditPage';

function Favourites({
    savedPalettes, 
    setSavedPalettes,
    setCurrentPaletteColorCode,
    currentPaletteColorCode,
    currentPaletteType,
    setCurrentPaletteType,
}) {
    
    // Поиск палитр
    const [foundPalettes, setFoundPalettes] = useState(savedPalettes);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [request, setRequest] = useState('');

    const findPalettes = (req) => {
        setFoundPalettes(savedPalettes.filter((p) => p.name.toLowerCase().includes(req.toLowerCase())));
    }

    function handleSubmit(e) {
        e.preventDefault();
        findPalettes(request);
    }

    function handleChange(e) {
        setRequest(e.target.value);
        findPalettes(e.target.value);
    }

    // Уведомления
    const [infoTooltipText, setInfoTooltipText] = useState('');
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const showInfoTooltip = (text) => {
        setInfoTooltipText(text);
        setIsInfoTooltipOpen(true);
        setTimeout(() => setIsInfoTooltipOpen(false), 2000);
    }

    // Удаление палитры
    function handleDeletePalette(paletteId) {
        paletteApi.deletePalette(paletteId)
            .then((res) => {
                setSavedPalettes(savedPalettes.filter((p) => p._id !== paletteId));
                setFoundPalettes(foundPalettes.filter((p) => p._id !== paletteId));
                setIsConfirmationPopupOpen(false);
                showInfoTooltip(`Палитра удалена`);
            })
            .catch((err) => {
                showInfoTooltip(err);
            })
    }

    const [paletteId, setPaletteId] = useState('');
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);


    // Экспорт палитры
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const args = {
        list: [],
        array: [', ', '[', ']'],
        JSON: [',\n\t\t', '{\n\t"colors":[\n\t\t', '\n\t]\n}', 'JSON']
    };

    const formatPaletteText = (palette,  toAddReg = ', ', start = '', toAddLast = '', code = 'HEX') => {
        return palette.reduce((prev, color, inx) => {
            let toAdd = inx + 1 === palette.length ? toAddLast : toAddReg;
            let colorString = code === 'HEX' ? color[code].code : JSON.stringify(color);
            return prev + colorString + toAdd;
        }, start)
    }

    const [paletteFormattedToExport, setPaletteFormattedToExport] = useState([]);

    function handleOpenExportPopup(palette) {
        console.log(palette);
        setPaletteFormattedToExport([
            {
                id: 1,
                title: 'Список',
                type: 'list',
                text: formatPaletteText(palette, ...args.list),
            },  
            {
                id: 2,
                title: 'Массив',
                type: 'array',
                text: formatPaletteText(palette, ...args.array),
            },
            {
                id: 3,
                title: 'JSON',
                type: 'JSON',
                text: formatPaletteText(palette, ...args.JSON),
            },
        ]);
        setIsPopupOpen(true);
    }

    // Редактирование палитры
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentEditPalette, setCurrentEditPalette] = useState(foundPalettes[0]);
    const [currentEditPaletteName, setCurrentEditPaletteName] = useState(currentEditPalette.name);
    const [currentEditedPaletteColors, setCurrentEditedPaletteColors] = useState([]);
    const [colorsCount, setColorsCount] = useState(3);
    const [colors, setColors] = useState(currentEditedPaletteColors);

    function handleOpenPaletteEditPage(palette) {
        setCurrentEditPalette(palette);
        setCurrentEditPaletteName(palette.name);
        setColorsCount(palette.colors.length)
        const newColors = palette.colors.map((c) => JSON.parse(c));
        setCurrentEditedPaletteColors(newColors.map((c) => {c.id += 1; return c}));
        setColors(newColors);
        setIsEditOpen(true);
    }

    function handleClosePaletteEditPage() {
        setIsEditOpen(false);
    }

    function handleSavePaletteChanges() {
        paletteApi.updatePalette(currentEditPalette._id, {
            name: currentEditPaletteName,
            colors: colors.map(c => JSON.stringify(c)),
        })
        .then((res) => {
            showInfoTooltip('Изменения сохранены');
            const updatedPaletteList = savedPalettes.map((p) =>  p._id === res._id ? res : p);
            setSavedPalettes(updatedPaletteList);
            setFoundPalettes(updatedPaletteList);
            handleClosePaletteEditPage();
        })
        .catch(err => {
            showInfoTooltip(err)
        })
    }


    return (
        <section className='favs'>
            <div className='favs__head'>
                <h1 className='favs__title'>Избранные палитры</h1>
                <button className={`favs__search-btn`} onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                }}>
                    <img src={isSearchOpen? CrossIcon : SearchIcon} alt="open search bar" className='favs__icon'/>
                </button>
            </div>
            <form className={`favs__search ${isSearchOpen ? '' : 'favs__hidden'}`} onSubmit={handleSubmit}>
                <label htmlFor="palette-search" className='favs__label'></label>
                <input 
                    type="text" 
                    id="palette-search" 
                    name='palette-search'
                    placeholder="Введите название палитры"     
                    className={`favs__input`}
                    required
                    onChange={handleChange}
                    value={request}
                />
            </form>
            <ul className='favs__list'>
                {foundPalettes.map((palette) => 
                    <li key={palette._id} className='favs__palette'>
                        <h3 className='favs__palette-title'>{palette.name}</h3>
                        <div className='favs__palette-wrapper'>
                            <ul className='favs__palette-colors'>
                                {palette.colors.map((colorJSON) => {
                                    const color = JSON.parse(colorJSON);
                                    return <li 
                                        key={color.id} 
                                        className='favs__color'
                                        style={{ background: color['HEX'].code }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(color['HEX'].code);
                                            showInfoTooltip('Цвет скопирован')
                                        }}
                                    >
                                        <button className='favs__color-text'>{color['HEX'].code}</button>
                                    </li>
                                }
                                )}
                            </ul>
                            <div className='favs__palette-btns'>
                                <button className='favs__palette-btn' onClick={() => handleOpenPaletteEditPage(palette)}>
                                    <img src={EditIcon} alt="edit palette" />
                                </button>
                                <button 
                                    className='favs__palette-btn'
                                    onClick={() => handleOpenExportPopup(palette.colors.map(c => JSON.parse(c)))}
                                >
                                    <img src={ExportIcon} alt="export palette" />
                                </button>
                                <button 
                                    className='favs__palette-btn' 
                                    onClick={() => {
                                        setPaletteId(palette._id);
                                        setIsConfirmationPopupOpen(true);
                                    }}
                                >
                                    <img src={DeleteIcon} alt="delete palette" />
                                </button>
                            </div>
                        </div>
                    </li>)
                }
            </ul>

            <PaletteEditPage 
                isOpen={isEditOpen}
                onClose={handleClosePaletteEditPage}
                palette={currentEditPalette}
                name={currentEditPaletteName}
                setName={setCurrentEditPaletteName}
                currentPalette={currentEditedPaletteColors}
                setCurrentPalette={setCurrentEditedPaletteColors}

                setCurrentPaletteColorCode={setCurrentPaletteColorCode}
                currentPaletteColorCode={currentPaletteColorCode}
                currentPaletteType={currentPaletteType}
                setCurrentPaletteType={setCurrentPaletteType}
                savedPalettes={savedPalettes}
                setSavedPalettes={setSavedPalettes}

                colorsCount={colorsCount}
                setColorsCount={setColorsCount}
                colors={colors}
                setColors={setColors}
                handleSavePaletteChanges={handleSavePaletteChanges}
            />

            <Popup 
                isOpen={isPopupOpen}
                onClose={() => {setIsPopupOpen(false); setPaletteFormattedToExport([])}}
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

            <Popup 
                isOpen={isConfirmationPopupOpen}
                onClose={() => setIsConfirmationPopupOpen(false)}
                title={'Вы уверены, что хотите удалить палитру?'}
                children={
                    <div className='favs__popup-btns'>
                        <button className='button favs__popup-btn' onClick={() => handleDeletePalette(paletteId)}>Удалить</button>
                        <button className='button favs__popup-btn favs__cancel-button' onClick={() => setIsConfirmationPopupOpen(false)}>Отменить</button>
                    </div>
                }
            />

            <InfoTooltip 
                isOpened={isInfoTooltipOpen}
                text={infoTooltipText}
            />
        </section>
    );
}

export default Favourites;