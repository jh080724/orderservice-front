import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='content-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
