import React, { useRef, useContext, useEffect } from 'react';

import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';

import Trucks from './Home/Driver/Trucks';
import Warning from './Warning';

const HomeDriver = () => {
    const warningRef = useRef();
    const successRef = useRef();

    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();

    const handleCreate = async (truck, name) => {
        await request(
            `/api/trucks/${JSON.parse(localStorage.getItem('userData')).userId}`,
            'POST',
            {
                sizes: {
                    width: truck.sizes.width,
                    height: truck.sizes.height,
                    length: truck.sizes.length,
                },
                weight: truck.weight,
                type: truck.type,
                name,
            },
            {Authorization: `Bearer ${auth.token}`}
        );
    };

    useEffect(() => {
        if(error !== null) {
            warningRef.current.className = 'warning warning--visible';
            setTimeout(() => {
                warningRef.current ? warningRef.current.className = 'warning warning--invisible' : console.log('memory leak');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    useEffect(() => {
        if(successfulResponse !== null) {
            successRef.current.className = 'warning warning--visible success';
            setTimeout(() => {
                successRef.current ? successRef.current.className = 'warning warning--invisible' : console.log('memory leak');
                clearSuccessfulResponse();
            }, 3000);
        }
    }, [successfulResponse, clearSuccessfulResponse]);

    return (
        <div className="home">
            <h2 className="home__title">You can add trucks</h2>
            <Trucks
                handleCreate={handleCreate}
                loading={loading}
            />
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
        </div>
    )
}

export default HomeDriver;