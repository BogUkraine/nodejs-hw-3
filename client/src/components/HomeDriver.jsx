import React, { useRef, useContext, useEffect } from 'react';

import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';

import Trucks from './Home/Trucks';
import Warning from './Warning';

const HomeDriver = () => {
    const warningRef = useRef();
    const successRef = useRef();

    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();

    const handleSprinterCreate = async () => {
        await request(
            '/api/trucks/add',
            'POST',
            {
                sizes: {
                    width: 170,
                    height: 250,
                    depth: 300
                },
                weight: 1700,
                type: 'Sprinter'
            },
            {Authorization: `Bearer ${auth.token}`}
        );
    };

    const handleSmallCreate = async () => {
        await request(
            '/api/trucks/add',
            'POST',
            {
                sizes: {
                    width: 170,
                    height: 250,
                    depth: 500
                },
                weight: 2500,
                type: 'Small straight'
            },
            {Authorization: `Bearer ${auth.token}`}
        );
    };

    const handleLargeCreate = async () => {
        await request(
            '/api/trucks/add',
            'POST',
            {
                sizes: {
                    width: 200,
                    height: 350,
                    depth: 700
                },
                weight: 4000,
                type: 'Large straight'
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
                handleLargeCreate={handleLargeCreate}
                handleSmallCreate={handleSmallCreate}
                handleSprinterCreate={handleSprinterCreate}
                loading={loading}
            />
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
        </div>
    )
}

export default HomeDriver;