import { Link } from 'react-router-dom';

function Login(props) {
    return (
        <main className="register">
            <section className="form">
                <h2 className="form__title">С возвращением!</h2>
                <form className="form__form-fields">
                    <label htmlFor="email" className="form__label">E-mail</label>
                    <input 
                        type="email"
                        id="email" 
                        name="email" 
                        className={`form__input `} 
                        placeholder="pochta@yandex.ru" 
                        required
                    />
                    <span className="form__error form__error_input_email"></span>
                    <label htmlFor="password" className="form__label">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className={`form__input form__input_error`}  
                        placeholder="your_password123" 
                        required
                    />
                    <span className="form__error form__error_input_password">Error bad bad</span>
                    <button 
                        type="submit" 
                        className={`form__submit-btn`} 
                    >
                        Войти
                    </button>
                </form>
                <p className="form__text">Нет аккаунта? <Link to="/register" className="form__link">Зарегистрируйтесь</Link></p>
            </section>
        </main>
    );
}

export default Login;
