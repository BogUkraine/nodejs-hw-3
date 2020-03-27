import React from 'react';
import ProfileInfo from './Profile/ProfileInfo';
import ProfileTrucks from './Profile/Driver/ProfileTrucks';
import ProfileDriverLoads from './Profile/Driver/ProfileDriverLoads';

const ProfileDriver = () => {
    return (
        <div className="profile">
            <ProfileInfo role={'driver'}/>
            <div className="profile__wrapper">
                <ProfileTrucks />
                <ProfileDriverLoads />
            </div>
        </div>
    )
}

export default ProfileDriver;