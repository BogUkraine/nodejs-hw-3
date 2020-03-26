import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <Header/>
                    <Home />
                </Route>
                <Route path="/profile" exact>
                    <Header/>
                    <Profile />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }
    
    return (
        <Switch>
            <Route exact path="/">
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default useRoutes;