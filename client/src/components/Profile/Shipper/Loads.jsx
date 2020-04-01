import React, {useState, useContext, useEffect, useRef} from 'react';
import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';

import Modal from './Modal';
import Warning from '../../Warning';

const Loads = () => {
    const warningRef = useRef();
    const successRef = useRef();
    const modalRef = useRef();
    const auth = useContext(AuthContext);
    const { request, loading, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();
    const [loads, setLoads] = useState(null);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [itemToChange, setItemToChange] = useState(null);

    const getLoads = async () => {
        const data = await request(
            `/api/loads/shipper`,
            'GET',
            null,
            {Authorization: `Bearer ${auth.token}`});
        setLoads(data);
    };

    const handlePost = async (item) => {
        console.log(item);
        await request(
            `/api/loads/${item._id}/status`,
            'PUT',
            item,
            {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const handleDelete = async (item) => {
        await request(
            `/api/loads/${item._id}`,
            'Delete',
            null,
            {Authorization: `Bearer ${auth.token}`});
        setShouldUpdate(!shouldUpdate);
    };

    const handleModal = (item) => {
        setItemToChange(item);
        modalRef.current.className = 'modal__overlay modal__overlay--visible';
    };

    useEffect(() => {
        getLoads();
    }, [shouldUpdate]);

    useEffect(() => {
        if(error !== null && successfulResponse === null) {
            warningRef.current.className = 'warning warning--visible';
            setTimeout(() => {
                warningRef.current ? warningRef.current.className = 'warning warning--invisible' : console.log('memory leak');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    useEffect(() => {
        if(successfulResponse !== null && error === null) {
            successRef.current.className = 'warning warning--visible success';
            setTimeout(() => {
                successRef.current ? successRef.current.className = 'warning warning--invisible' : console.log('memory leak');
                clearSuccessfulResponse();
            }, 3000);
        }
    }, [successfulResponse, clearSuccessfulResponse]);

    return (
        <div className="profile__loads profile-loads">
            <h2 className="profile-loads__title">Your loads</h2>
            {loads && loads.length !== 0
            ? loads.map((item, index) => {
                return (
                    <div className="profile-loads__item" key={index}>
                        <div className="profile-loads__description">
                            <div className="profile-loads__wrapper">
                                <i className="fas fa-box profile-loads__icon"></i>
                            </div>
                            <div className="profile-loads__wrapper">
                                <p className="profile-loads__text">Width: {item.dimensions.width} cm</p>
                                <p className="profile-loads__text">Height: {item.dimensions.height} cm</p>
                                <p className="profile-loads__text">Length: {item.dimensions.length} cm</p>
                            </div>
                            <div className="profile-loads__wrapper">
                                <p className="profile-loads__text">Payload: {item.payload} kg</p>
                                <p className="profile-loads__text">Status: {item.status}</p>
                                <p className="profile-loads__text">State: {item.state}</p>
                            </div>
                            {item.message
                            ?
                            <div className="profile-loads__wrapper">
                                <p className="profile-loads__text">Addition message: {item.message}</p>
                            </div>
                            : null}
                        </div>
                        <div className="profile-loads__buttons">
                            {item.status === 'NEW'
                            ? 
                            <>
                                <button className="profile-loads__button button"
                                    onClick={() => handlePost(item)}>
                                    Post
                                </button>
                                <button className="profile-loads__button button"
                                    onClick={() => handleDelete(item)}>
                                    Delete
                                </button>
                                <button className="profile-loads__button button"
                                    onClick={() => handleModal(item)}>
                                    Change
                                </button>
                            </>
                            : <h2 className="profile-loads__title">{item.status}</h2>}
                        </div>
                    </div>
                )
            })
            : 'You do not have any loads'}
            <Modal 
                referance={modalRef} 
                setShouldUpdate={setShouldUpdate} 
                shouldUpdate={shouldUpdate} 
                loading={loading}
                request={request}
                auth={auth}
                itemToChange={itemToChange}
            />
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
        </div>
    )
}

export default Loads;