import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MasterLayout from './component/layout';
import { publicRoutes, protectedRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

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
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
      <Routes>
        {protectedRoutes.map((route, index) => {
          const Layout = route.layout || MasterLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout><Page /></Layout>
                </ProtectedRoute>}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
