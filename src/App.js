import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContextProvider from './context/AppContextProvider';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <>
      <Router>
        <AppContextProvider>
          <Navbar />
          <Alert />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </AppContextProvider>
      </Router>
    </>
  );
}

export default App;
