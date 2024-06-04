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
import { generateMonochromaticPalette } from '../../utils/paletteGenerator';
import { colorCodes, paletteTypes, paletteGenerators } from '../../utils/constants';
import Favourites from '../Favourites/Favourites';
import * as paletteApi from '../../utils/paletteApi';

function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // const [currentPaletteSettings, setCurrentPaletteSettings] = useState({
  //     code: colorCodes.hex, 
  //     type: paletteTypes.monochrome,
  //     palette: generateMonochromaticPalette([Math.floor(Math.random() * 360), 60, 60], 6)
  //   });

    const [currentPaletteColorCode, setCurrentPaletteColorCode] = useState(colorCodes.hex);
    const [currentPaletteType, setCurrentPaletteType] = useState(paletteTypes.monochrome);
    const [currentPalette, setCurrentPalette] = useState(generateMonochromaticPalette([Math.floor(Math.random() * 360), 60, 60], 6));
    const [colorsCount, setColorsCount] = useState(3);
    const [colors, setColors] = useState(currentPalette.slice(0, colorsCount));

    function handleGeneratePalette(randomColor) {
      const newPalette = paletteGenerators[currentPaletteType](randomColor, 6);
      setCurrentPalette(newPalette);
      setColors(newPalette.slice(0, colorsCount));
    }

    const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      userApi.getUserInfo()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        }
      })
      .then(() => {
        paletteApi.getUserPalettes()
        .then((data) => {
          setSavedPalettes(data);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        localStorage.clear('token');
      });
    }
  }, []);

  useEffect(() => {
    async function setUser() {
      await userApi.getUserInfo()
        .then((user) => {
          console.log(user);
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)})
    } 

    async function setPalettes() {
      await paletteApi.getUserPalettes()
      .then((data) => {
        setSavedPalettes(data);
      })
      .catch((err) => {console.log(err)})
    }

    if (loggedIn) {
      setUser();
      setPalettes();
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
              <ButtonBar 
                setCurrentPaletteColorCode={setCurrentPaletteColorCode} 
                currentPaletteColorCode={currentPaletteColorCode}
                currentPaletteType={currentPaletteType}
                setCurrentPaletteType={setCurrentPaletteType}
                currentPalette={currentPalette}
                loggedIn={loggedIn}
                savedPalettes={savedPalettes}
                setSavedPalettes={setSavedPalettes}
                handleGeneratePalette={handleGeneratePalette}
              />
              <Palette 
                currentPaletteColorCode={currentPaletteColorCode}
                currentPalette={currentPalette}
                setCurrentPalette={setCurrentPalette}
                colorsCount={colorsCount}
                setColorsCount={setColorsCount}
                colors={colors}
                setColors={setColors}
              />
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
            <Favourites 
              savedPalettes={savedPalettes} 
              setSavedPalettes={setSavedPalettes}
              setCurrentPaletteColorCode={setCurrentPaletteColorCode} 
              currentPaletteColorCode={currentPaletteColorCode}
              currentPaletteType={currentPaletteType}
              setCurrentPaletteType={setCurrentPaletteType}
            />
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
