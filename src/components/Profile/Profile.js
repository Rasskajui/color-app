import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import './Profile.css';
import Popup from "../Popup/Popup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as userApi from '../../utils/userApi';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formValue, setFormValue] = useState({email: currentUser.email, username: currentUser.username});
    const [errors, setErrors] = useState({email: '', username: ''});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isMessageOpened, setIsMessageOpened] = useState(false);
    const [message, setMessage] = useState('Что-то пошло не так...');

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
        userApi.updateUserInfo(formValue)
            .then((user) => {
                props.setCurrentUser(user.data);
                setIsPopupOpen(false);
                setMessage('Данные изменены');
                setIsMessageOpened(true)
                setTimeout(() => setIsMessageOpened(false), 3000);
            })
            .catch((err) => {
                setMessage(err);
                setIsMessageOpened(true);
                setTimeout(() => setIsMessageOpened(false), 3000);
            })
    }

    return (
        <>
            <InfoTooltip text={message} isOpened={isMessageOpened}/>
            <Popup 
                isOpen={isPopupOpen} 
                onClose={() => {
                    setIsPopupOpen(false);
                    setErrors({email: '', username: ''});
                    setFormValue({email: currentUser.email, username: currentUser.username})
                }} 
                title={'Введите новые данные'}
                children={
                    <form className="form__form-fields" onSubmit={handleSubmit}>
                        <label htmlFor="username" className="form__label">Логин</label>
                        <input 
                            type="text" 
                            id="username"
                            name="username" 
                            className={`form__input ${errors.username ? 'form__input_error' : ''}`}
                            placeholder="Имя пользователя" 
                            minLength="2" 
                            maxLength="30" 
                            required
                            value={formValue.username}
                            onChange={handleChange}
                        />
                        <span className="form__error">{errors.username}</span>
                        <label htmlFor="email" className="form__label">E-mail</label>
                        <input 
                            type="email"
                            id="email" 
                            name="email" 
                            className={`form__input ${errors.email ? 'form__input_error' : ''}`}
                            placeholder="pochta@yandex.ru" 
                            required
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        <span className="form__error form__error_input_email">{errors.email}</span>
                        <button 
                            type="submit" 
                            className={`form__submit-btn ${isSubmitDisabled ? 'form__submit-btn_disabled' : ''}`}
                            disabled={isSubmitDisabled}
                        >
                            Сохранить
                        </button>
                    </form>
                }
            />
            <section className='profile'>
                <h2 className='profile__title'>{`Добро пожаловать, ${currentUser.username}!`}</h2>
                <div className='profile__field'>
                    <h3 className='profile__field-title'>Логин</h3>
                    <p className='profile__field-text'>{currentUser.username}</p>
                </div>
                <div className='profile__field'>
                    <h3 className='profile__field-title'>Email</h3>
                    <p className='profile__field-text'>{currentUser.email}</p>
                </div>
                <button className='profile__button' type='button' onClick={() => setIsPopupOpen(!isPopupOpen)}>Редактировать</button> 
                <button className='profile__button profile__button_accent' onClick={props.onExit}>Выйти из аккаунта</button> 
            </section>
        </>
    )
}

export default Profile;
