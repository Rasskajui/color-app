import './App.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Header from '../Header/Header';
import ButtonBar from '../ButtonBar/ButtonBar';
import Palette from '../Palette/Palette';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <ButtonBar />
            <Palette />
            <ThemeSwitcher />
          </>
        }/>

        <Route path='/login' element={
          <>
            <Header page='login'/>
            <Login />
            <ThemeSwitcher/> 
          </>
        }/>

        <Route path='/register' element={
          <>
            <Header page='register'/>
            <Register/>
            <ThemeSwitcher/> 
          </>
        }/>

      </Routes>
    </div>
  );
}

export default App;
