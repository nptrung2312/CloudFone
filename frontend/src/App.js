import './App.css';
import { publicRoutes } from './routes';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MasterLayout from './component/layout';

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
        {publicRoutes.map((route, index) => {
          const Layout = route.layout || MasterLayout
          const Page = route.component;
          return <Route key={index} path={route.path} element={
            <Layout><Page /></Layout>
          } />
        })}
      </Routes>
    </div>
  );
}

export default App;
