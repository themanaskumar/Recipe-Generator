import Home from './components/Home';
import LoginPage from './components/loginPage';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home2 from './components/Home2';
import About from './components/About';
import Navbar from './components/Navbar';
import GeneratePage from './components/Generate';
import Footer from './components/Footer';
import Search_Recipe from './components/Search_Recipe';
import ViewSaved from './components/ViewSaved';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLogin] = useState(false);
  const handleLogin = () => {
    setLogin(true);
  };

  useEffect(() => {
    // Check if token exists to persist login
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
    }
  });

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} setLogin={setLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage handleLogin ={handleLogin} />} />
          <Route path='/signup' element={<Signup handleLogin={handleLogin} />} />
          <Route path='/profile' element={loggedIn ? <Profile loggedIn={loggedIn} setLogin={setLogin} /> : <LoginPage handleLogin ={handleLogin} />} />
          <Route path='/home' element={loggedIn ? <Home2 /> : <LoginPage handleLogin ={handleLogin} />} />
          <Route path='/about' element={<About />} />
          <Route path='/generate' element={loggedIn ? <GeneratePage /> : <LoginPage handleLogin = {handleLogin} />} />
          <Route path='/searchRecipe' element={loggedIn ? <Search_Recipe /> : <LoginPage handleLogin = {handleLogin} />} />
          <Route path='/viewSaved' element={loggedIn ? <ViewSaved /> : <LoginPage handleLogin = {handleLogin} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
