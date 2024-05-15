import './Header.css';
import { Link } from 'react-router-dom';
import HeartIcon from '../../images/icons/heart.svg';
import UserIcon from '../../images/icons/user-square.svg';

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
                {!props.loggedIn? 
                <ul className='header__nav-list'>
                    {props.page !== 'register' && <li className='header__nav-item'>
                        <Link to='/register' className='header__nav-btn button'>Зарегистрироваться</Link>
                    </li>}
                    {props.page !== 'login' && <li className='header__nav-item'>
                        <Link to='/login' className='header__nav-btn button button_accent'>Войти</Link>
                    </li>}
                </ul>
                : 
                <ul className='header__nav-list header__nav-list_logged-in'>
                    {props.page !== 'favourites' && <li className='header__nav-item'>
                        <Link to='/favourites' className='header__nav-btn '>
                            <img src={HeartIcon} alt="Избранное" className='header__nav-icon'/>
                        </Link>
                    </li>}
                    {props.page !== 'profile' && <li className='header__nav-item'>
                        <Link to='/profile' className='header__nav-btn '>
                            <img src={UserIcon} alt="Личный кабинет" className='header__nav-icon'/>
                        </Link>
                    </li>
                    }
                </ul>
                }
            </nav>
        </header>
    );
}

export default Header;