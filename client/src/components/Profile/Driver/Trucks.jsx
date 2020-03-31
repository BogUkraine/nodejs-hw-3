import React, { useContext, useRef, useEffect, useState } from 'react';

import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';
import Warning from '../../Warning';
import Modal from './Modal';

const iconClass = {
    'Sprinter': 'fa-truck-pickup',
    'Small straight': 'fa-truck',
    'Large straight': 'fa-truck-moving',
}

const TrucksMap = ({trucks, handleAssign, handleDelete, handleChange, loading}) => {
    const [isBusy, setIsBusy] = useState(false);
    useEffect(() => {
        trucks.forEach((item) => {
            if (item.status === 'OL') {
                setIsBusy(true);
            }
        })
    });

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
                            <span>Length: {item.sizes.length}</span>
                        </p>
                        <p className="driver-truck__sizes">
                            <span>Name: {item.name}</span>
                            <span>Allowing weight: {item.weight}</span>
                            <span>Status: {item.status}</span>
                        </p>
                    </div>
                    <div className="driver-truck__buttons">
                        {!item.assigned_to && !isBusy
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
                            <button
                                className="driver-truck__button button"
                                disabled={loading}
                                onClick={() => handleChange(item)}>
                                    Change
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
    const modalRef = useRef();
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();
    const [itemToChange, setItemToChange] = useState({name: 'none'});

    const handleAssign = async (id) => {
        await request(`/api/trucks/${id}/assign`, 'PUT', null, {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const handleDelete = async (id) => {
        await request(`/api/trucks/${id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const setNewName = async (value, id) => {
        await request(`/api/trucks/${id}/name`, 'PUT', {name: value}, {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const handleChange = (item) => {
        setItemToChange(item);
        modalRef.current.className = 'modal__overlay modal__overlay--visible';
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
                handleChange={handleChange}
                loading={loading}/>
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
            <Modal referance={modalRef} loading={loading} setNewName={setNewName} itemToChange={itemToChange}/>
        </div>
    )
}

export default Trucks;