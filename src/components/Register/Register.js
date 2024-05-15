import { Link } from 'react-router-dom';

function Register(props) {
    return (
        <main className="register">
            <section className="form">
                <h2 className="form__title">Добро пожаловать!</h2>
                <form className="form__form-fields">
                    <label htmlFor="name" className="form__label">Логин</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name" 
                            className={`form__input `} 
                            placeholder="Имя пользователя" 
                            minLength="2" 
                            maxLength="30" 
                            require
                        />
                    <span className="form__error"></span>
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
                        className={`form__input`}  
                        placeholder="your_password123" 
                        required
                    />
                    <span className="form__error form__error_input_password"></span>
                    <button 
                        type="submit" 
                        className={`form__submit-btn`} 
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <p className="form__text">Есть аккаунт? <Link to="/login" className="form__link">Войти</Link></p>
            </section>
        </main>
    );
}

export default Register;
