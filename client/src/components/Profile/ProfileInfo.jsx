import React, { useRef, useContext, useEffect, useState } from 'react';

import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

import Warning from '../Warning';
import SidebarMain from './SidebarMain';
import SidebarMainButtons from './SidebarMainButtons';
import ModalPhoto from './ModalPhoto';
import ModalPassword from './ModalPassword';

const ProfileInfo = ({role}) => {
    const modalPassword = useRef();
    const modalPhoto = useRef();
    const buttonChangePassword = useRef();
    const buttonChoosePhoto = useRef();
    const warningRef = useRef();
    const successRef = useRef();
    const fileInput = useRef();

    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();
    const [ form, setForm ] = useState({password: ''});

    const handleForm = event => {
        setForm({password: event.target.value});
    };

    const changePasswordHandler = () => {
        buttonChangePassword.current.className = 'sidebar__changer button sidebar__changer--invisible';
        buttonChoosePhoto.current.className = 'sidebar__changer button sidebar__changer--invisible';
        modalPhoto.current.className = 'sidebar__modal sidebar__modal--invisible';
        modalPassword.current.className = 'sidebar__modal sidebar__modal--visible';
    };

    const hideModalHandler = () => {
        buttonChangePassword.current.className = 'sidebar__changer button sidebar__changer--visible';
        buttonChoosePhoto.current.className = 'sidebar__changer button sidebar__changer--visible';
        modalPhoto.current.className = 'sidebar__modal sidebar__modal--invisible';
        modalPassword.current.className = 'sidebar__modal sidebar__modal--invisible';
    };

    const handleChangePassword = async () => {
        await request(`/api/profile/${JSON.parse(localStorage.getItem('userData')).userId}/password`,
        'PUT',
        {...form},
        { Authorization: `Bearer ${auth.token}`});
    };

    const handleDelete = async () => {
        await request(`/api/profile/${JSON.parse(localStorage.getItem('userData')).userId}`,
        'DELETE',
        null,
        {Authorization: `Bearer ${auth.token}`});
        auth.logout();
    };

    const changePhotoHandler = async () => {
        console.log(fileInput.current.value);
        // await request(
        //     '/api/profile/photo', 
        //     'PUT', 
        //     {
        //         value: fileInput.current.value,
        //         size: fileInput.current.size, 
        //     },
        //     {Authorization: `Bearer ${auth.token}`}
        // )
    };

    const choosePhotoHandler = () => {
        fileInput.current.click();
        buttonChangePassword.current.className = 'sidebar__changer button sidebar__changer--invisible';
        modalPhoto.current.className = 'sidebar__modal sidebar__modal--visible';
        modalPassword.current.className = 'sidebar__modal sidebar__modal--invisible';
    }

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
        <div className="profile__sidebar sidebar">
            <SidebarMain />
            <div className="sidebar__container">
                <SidebarMainButtons
                    changePasswordHandler={changePasswordHandler}
                    buttonChangePassword={buttonChangePassword}
                    choosePhotoHandler={choosePhotoHandler}
                    buttonChoosePhoto={buttonChoosePhoto}
                    fileInput={fileInput}
                    loading={loading}/>
                <ModalPhoto 
                    modalPhoto={modalPhoto}
                    changePhotoHandler={changePhotoHandler}
                    loading={loading}
                    hideModalHandler={hideModalHandler}/>
                <ModalPassword
                    modalPassword={modalPassword}
                    handleForm={handleForm}
                    handleChangePassword={handleChangePassword}
                    loading={loading}
                    hideModalHandler={hideModalHandler}/>
            </div>
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
            {role === 'shipper'
            ? <button className="sidebar__delete button button--red" onClick={handleDelete}>Delete account</button>
            : null}
        </div>
    )
}

export default ProfileInfo;