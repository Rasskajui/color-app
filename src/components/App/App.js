import './App.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Header from '../Header/Header';
import ButtonBar from '../ButtonBar/ButtonBar';
import Palette from '../Palette/Palette';

function App() {

  return (
    <div className="page">
      <Header />
      <ButtonBar />
      <Palette />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
