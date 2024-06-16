import './App.css';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(account);
      navigate('/home');
    } else {
      navigate('/');
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
