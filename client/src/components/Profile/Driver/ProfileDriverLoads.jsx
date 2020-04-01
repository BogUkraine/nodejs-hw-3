import React, {useState, useEffect, useContext} from 'react';
import Loads from './Loads';

import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';

const ProfileDriverLoads = () => {
    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [loads, setLoads] = useState(null);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const getLoads = async () => {
        const data = await request(
            `/api/loads/driver`,
            'GET',
            null,
            {Authorization: `Bearer ${auth.token}`}
        );
        setLoads(data);
    };

    const handleShipped = async (item) => {
        await request(
            `/api/loads/${item._id}/shipped`,
            'PUT',
            null,
            {Authorization: `Bearer ${auth.token}`}
        )
        setShouldUpdate(!shouldUpdate);
    };

    useEffect(() => {
        getLoads();        
    }, [shouldUpdate]);

    return (
        <div className="profile__loads">
            <h2 className="profile__title">Your loads</h2>
            {loads !== null && loads !== undefined && loads.length !== 0
            ? <Loads loads={loads} loading={loading} handleShipped={handleShipped}/>
            : 'You have no assigned loads'}
        </div>
    )
}

export default ProfileDriverLoads;