import React from 'react';
import ProfileInfo from './Profile/ProfileInfo';
import Loads from './Profile/Shipper/Loads';

const ProfileShipper = () => {
    return (
        <div className="profile">
            <ProfileInfo role={'shipper'}/>
            <div className="profile__wrapper">
                <Loads />
            </div>
        </div>
    )
}

export default ProfileShipper;