import React, { useContext, useRef, useEffect } from 'react';

import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';
import Warning from '../../Warning';

const iconClass = {
    'Sprinter': 'fa-truck-pickup',
    'Small straight': 'fa-truck',
    'Large straight': 'fa-truck-moving',
}

const TrucksMap = ({trucks, handleAssign, handleDelete, loading}) => {
    return (
        trucks.map((item, index) => {
            return (
                <div className="driver-truck" key={index}>
                    <h2 className="driver-truck__title">
                        {item.type}{item.assigned_to ? ' (Assigned)' : null}
                    </h2>
                    <div className="driver-truck__description">
                        <i className={"fas trucks__icon--normal " + iconClass[item.type]}></i>
                        <p className="driver-truck__sizes">
                            <span>Width: {item.sizes.width}</span>
                            <span>Height: {item.sizes.height}</span>
                            <span>Depth: {item.sizes.depth}</span>
                        </p>
                        <p className="driver-truck__sizes">
                            <span>Allowing weight: {item.weight}</span>
                            <span>Status: {item.status}</span>
                        </p>
                    </div>
                    <div className="driver-truck__buttons">
                        {!item.assigned_to
                        ? <>
                            <button
                                className="driver-truck__button button"
                                disabled={loading}
                                onClick={() => handleAssign(item._id)}>
                                    Assign
                            </button>
                            <button
                                className="driver-truck__button button"
                                disabled={loading}
                                onClick={() => handleDelete(item._id)}>
                                    Delete
                            </button>
                        </>
                        : null}
                    </div>
                </div>
            )
        })
    )
}

const Trucks = ({trucks, shouldUpdate, setShouldUpdate}) => {
    const warningRef = useRef();
    const successRef = useRef();
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();

    const handleAssign = async (id) => {
        await request('/api/trucks/assign', 'PUT', {truck_id: id}, {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const handleDelete = async (id) => {
        await request('/api/trucks/delete', 'DELETE', {truck_id: id});
        setShouldUpdate(!shouldUpdate);
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
        <div className="truck-list">
            <TrucksMap
                trucks={trucks}
                handleAssign={handleAssign}
                handleDelete={handleDelete}
                loading={loading}/>
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
        </div>
    )
}

export default Trucks;