import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <Link to='/' className='header__logo'>
                <p className="header__logo-title logo">Color
                <span style={{color: '#f00'}}> p</span>
                <span style={{color: '#FF7A00'}}>a</span>
                <span style={{color: '#FFC700'}}>l</span>
                <span style={{color: '#00D522'}}>e</span>
                <span style={{color: '#00C2FF'}}>t</span>
                <span style={{color: '#000AFF'}}>t</span>
                <span style={{color: '#6B0CA6'}}>e </span>
                generator</p>
            </Link>
            <input type="checkbox" id="check" className="header__menu-check"/>
            <label htmlFor="check" className="header__menu-btn"></label>
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    {props.page !== 'register' && <li className='header__nav-item'>
                        <Link to='/register' className='header__nav-btn button'>Зарегистрироваться</Link>
                    </li>}
                    {props.page !== 'login' && <li className='header__nav-item'>
                        <Link to='/login' className='header__nav-btn button button_accent'>Войти</Link>
                    </li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;