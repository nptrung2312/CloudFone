import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MasterLayout from './component/layout';
import { publicRoutes, protectedRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (!session) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
      <Routes>
        {protectedRoutes.map((route, indexProTect) => {
          const Layout = route.layout || MasterLayout;
          const Page = route.component;
          return (
            <Route
              key={indexProTect}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout><Page /></Layout>
                </ProtectedRoute>}
            />
          );
        })}
      </Routes>
      <ToastContainer
        position="top-center"
        className="toast-container"
        toastClassName="toast-item"
        bodyClassName="toast-item-body"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        closeOnClick={false}
        draggable={false}
      />
    </div>
  );
}

export default App;
