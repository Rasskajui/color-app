import { Link } from 'react-router-dom';
import { useState } from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Login(props) {
    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({email: '', password: ''});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const [message, setMessage] = useState('Что-то пошло не так...');
    const [isMessageOpened, setIsMessageOpened] = useState(false);

    const checkErrors = (input) => {
        if (!input.validity.valid) {
            setErrors({
                ...errors,
                [input.name]: input.validationMessage.split('.')[0]
            });
            setIsSubmitDisabled(true);
        } else {
            setErrors({
                ...errors,
                [input.name]: ''
            });
            if (Object.values(errors).every((el) => el === '') && Object.values(formValue).every((el) => el !== ''))
                setIsSubmitDisabled(false);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        checkErrors(e.target);

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(formValue)
        .catch((err) => {
            setMessage(err);
            setIsMessageOpened(true);
            setTimeout(() => setIsMessageOpened(false), 3000);
        })
    }


    return (
        <main className="register">
            <InfoTooltip text={message} isOpened={isMessageOpened}/>
            <section className="form">
                <h2 className="form__title">С возвращением!</h2>
                <form className="form__form-fields" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form__label">E-mail</label>
                    <input 
                        type="email"
                        id="email" 
                        name="email" 
                        className={`form__input ${errors.email ? 'form__input_error' : ''}`} 
                        placeholder="pochta@mail.ru" 
                        required
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    <span className="form__error form__error_input_email">{errors.email}</span>
                    <label htmlFor="password" className="form__label">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className={`form__input ${errors.password ? 'form__input_error' : ''}`}  
                        placeholder="your_password123" 
                        required
                        value={formValue.password}
                        onChange={handleChange}
                    />
                    <span className="form__error form__error_input_password">{errors.password}</span>
                    <button 
                        type="submit" 
                        className={`form__submit-btn ${isSubmitDisabled ? 'form__submit-btn_disabled' : ''}`} 
                        disabled={isSubmitDisabled}
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
