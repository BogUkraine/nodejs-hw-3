import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';

import AuthContext from './context/AuthContext';
import useRoutes from './routes';
import useAuth from './hooks/auth.hook';

function App() {
  const { token, login, logout, userId, role, loginName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  // if(isReady) {
  //   return <Loader />
  // }
  return (
	<AuthContext.Provider value={{ token, login, logout, userId, role, loginName }}>
		<BrowserRouter>
			{routes}
		</BrowserRouter>
	</AuthContext.Provider>
  );
}

export default App;
