import './App.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Header from '../Header/Header';
import ButtonBar from '../ButtonBar/ButtonBar';
import Palette from '../Palette/Palette';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userApi from '../../utils/userApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    async function setUser() {
      await userApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)})
    }

    if (loggedIn) {
      setUser();
    }

  }, [loggedIn]);

  function handleLogin(formValue) {
    return userApi.login(formValue)
      .then(() => {
        userApi.getUserInfo()
          .then((user) => {
            setCurrentUser(user);
            setLoggedIn(true);
          })
          .then(() => {
            navigate('/profile', {replace:true})
          })
          .catch((err) => {
            return Promise.reject(`Ошибка ${err.status}`);
          })
      })
  }

  function handleExit() {
    localStorage.clear('token');
    setCurrentUser(null);
    setLoggedIn(false);
    navigate('/', {replace: true});
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header loggedIn={loggedIn}/>
            <ButtonBar />
            <Palette />
            <ThemeSwitcher />
          </>
        }/>

        <Route path='/login' element={
          loggedIn?
          <Navigate to='/' replace/>
          :
          <>
            <Header page='login' loggedIn={loggedIn}/>
            <Login onLogin={handleLogin}/>
            <ThemeSwitcher/> 
          </>
        }/>

        <Route path='/register' element={
          loggedIn?
          <Navigate to='/' replace/>
          :
          <>
            <Header page='register' loggedIn={loggedIn}/>
            <Register onLogin={handleLogin}/>
            <ThemeSwitcher/> 
          </>
        }/>

        <Route path='/favourites' element={
          loggedIn?
          <CurrentUserContext.Provider value={currentUser}>
            <Header page='favourites' loggedIn={loggedIn}/>
            <ThemeSwitcher/> 
          </CurrentUserContext.Provider>
          :
          <Navigate to='/' replace/>
        }/>

        <Route path='/profile' element={
          loggedIn?
          <CurrentUserContext.Provider value={currentUser}>
            <Header page='profile' loggedIn={loggedIn}/>
            <Profile onExit={handleExit} setCurrentUser={setCurrentUser}/>  
            <ThemeSwitcher/> 
          </CurrentUserContext.Provider>
          :
          <Navigate to='/' replace/>
        }/>

      </Routes>
    </div>
  );
}

export default App;
