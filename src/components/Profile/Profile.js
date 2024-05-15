import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import './Profile.css';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
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
            <button className='profile__button'>Редактировать</button> 
            <button className='profile__button profile__button_accent' onClick={props.onExit}>Выйти из аккаунта</button> 
        </section>
    )
}

export default Profile;
