import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import logo from '../../images/freight.png';

const Header = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        auth.logout();
        history.push('/');
    }

    return (
        <div className="header">
            <div className="header__logo logo">
                <img src={logo} alt="freight" className="logo__image"/>
            </div>
            <div className="header__nav nav">
                <NavLink to="/home" className="nav__link">Home</NavLink>
                <NavLink to="/profile" className="nav__link">Profile</NavLink>
            </div>
            <div className="header__logout" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    )
}

export default Header;