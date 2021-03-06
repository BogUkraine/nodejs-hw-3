import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';

import AuthContext from './context/AuthContext';
import useRoutes from './routes';
import useAuth from './hooks/auth.hook';

import BounceLoader from "react-spinners/BounceLoader";

function App() {
	const { token, login, logout, userId, role, loginName, isReady } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated, role);

	if(!isReady) {
		return (
			<div className="loading">
				<BounceLoader
					size={150}
					color={'#112121'}
				/>
			</div>
		)
	}

	return (
		<AuthContext.Provider value={{ token, login, logout, userId, role, loginName }}>
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
