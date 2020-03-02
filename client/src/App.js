import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './app/routesConfig';
import 'react-toastify/dist/ReactToastify.css';
import 'babel-polyfill';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/AuthContext';
import { useLogin } from './app/hooks/login.hook';
import { Button, Menu, Drawer } from '@material-ui/core';
import Navigation from './app/components/navigation';

const App = () => {
  const { token, login, logout, userId } = useLogin();
  console.log(token)
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  const [openNav, setOpenNav] = React.useState(false);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <Router>
        <div>
          <Button onClick={() => setOpenNav(!openNav)}>
            Open Menu
          </Button>
          <Drawer open={openNav} onClose={() => setOpenNav(!openNav)}>
            <Navigation />
          </Drawer>
          {routes}
          <ToastContainer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
