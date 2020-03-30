import React, { useState, useEffect, useContext } from 'react';

import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';

import Trucks from './Trucks';

const ProfileTrucks = () => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [trucks, setTrucks] = useState(null);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const getTrucks = async () => {
        const data = await request('/api/trucks/mytrucks', 'GET', null, {Authorization: `Bearer ${auth.token}`});
        setTrucks(data);
    };

    useEffect(() => {
        getTrucks();
    }, [shouldUpdate]);

    return (
        <div className="profile__trucks">
            <h2 className="profile__title">Your trucks</h2>
            {trucks && trucks.length !== 0
            ? <Trucks trucks={trucks} shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate}/>
            : 'You have no trucks. Go home to create one'}
        </div>
    )
}

export default ProfileTrucks;