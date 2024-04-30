import './App.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';

function App() {

  return (
    <div className="page">
      <Header />
      <Palette />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
