import React from 'react';
import defaultImage from '../../images/defaultImage.png';

const SidebarMain = ({userData}) => {
    return (
        <div className="sidebar__main">
            <img src={userData && userData.photo ? userData.photo : defaultImage} alt="userPicture" className="sidebar__photo"/>
            <p className="sidebar__login">
                {JSON.parse(localStorage.getItem('userData')).role}:{' '}
                {JSON.parse(localStorage.getItem('userData')).loginName}
            </p>
        </div>
    )
};

export default SidebarMain;