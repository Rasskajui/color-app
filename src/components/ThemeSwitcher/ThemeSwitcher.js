import './ThemeSwitcher.css';
import { useTheme } from '../../hooks/useTheme';

function ThemeSwitcher(props) {

    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <button 
            className="theme-switcher" 
            type="button"
            onClick={changeTheme}
        >
            <span className="theme-switcher__text">{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</span>
        </button>
    );
}

export default ThemeSwitcher;