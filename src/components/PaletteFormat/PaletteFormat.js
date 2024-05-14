import './PaletteFormat.css';

function PaletteFormat({title, text, showMessage}) {

    function copyToClipboard() {
        navigator.clipboard.writeText(text);
        showMessage();
    }

    return (
        <li className='popup__el'>
            <div className='popup__el-head'>
                <h3 className='popup__el-title'>{title}</h3>
                <button className='popup__el-btn button' onClick={copyToClipboard}>Скопировать</ button>
            </div>
            <textarea className='popup__el-text' defaultValue={text} disabled></textarea>
        </li>
    );
}

export default PaletteFormat;