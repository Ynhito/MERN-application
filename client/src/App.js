import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './app/routesConfig';
import 'react-toastify/dist/ReactToastify.css';
import 'babel-polyfill';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/AuthContext';
import { useLogin } from './app/hooks/login.hook';

const App = () => {
  const { token, login, logout, userId } = useLogin();
  console.log(token)
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <Router>
        <div>
          {routes}
          <ToastContainer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
