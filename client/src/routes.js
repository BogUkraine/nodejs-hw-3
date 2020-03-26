import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Auth from './components/Auth';
import HomeShipper from './components/Home/HomeShipper';
import ProfileShipper from './components/Profile/ProfileShipper';
import HomeDriver from './components/Home/HomeDriver';
import ProfileDriver from './components/Profile/ProfileDriver';
import Header from './components/Header/Header';

const useRoutes = (isAuthenticated, role) => {
    if (isAuthenticated && role === 'Shipper') {
        return (
            <Switch>
                <Route path="/home" exact>
                    <Header />
                    <HomeShipper />
                </Route>
                <Route path="/profile" exact>
                    <Header />
                    <ProfileShipper />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }
    if (isAuthenticated && role === 'Driver') {
        return (
            <Switch>
                <Route path="/home" exact>
                    <Header />
                    <HomeDriver />
                </Route>
                <Route path="/profile" exact>
                    <Header />
                    <ProfileDriver />
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