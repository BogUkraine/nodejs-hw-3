import React, {useState} from 'react';
import Loads from './Loads';

const ProfileDriverLoads = () => {
    const [loads, setLoads] = useState(null);

    return (
        <div className="profile__loads">
            <h2 className="profile__title">Your loads</h2>
            {loads === null
            ? 'You have no assigned loads'
            : <Loads />}
        </div>
    )
}

export default ProfileDriverLoads;