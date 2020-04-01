import React, { useState, useContext, useEffect, useRef} from 'react';
import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';

import Warning from '../../Warning';

const Loads = () => {
    const warningRef = useRef();
    const successRef = useRef();
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError, successfulResponse, clearSuccessfulResponse } = useHttp();
    const [ form, setForm ] = useState({
        width: '',
        height: '',
        length: '',
        payload: '',
        message: '',
    });

    const handleForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleCreateLoad = async () => {
        await request(
            '/api/loads/',
            'POST', 
            {
                dimensions: {
                    width: form.width,
                    height: form.height,
                    length: form.length,
                },
                payload: form.payload,
                message: form.message,
                status: 'NEW',
                state: 'Waiting',
            },
            {Authorization: `Bearer ${auth.token}`});
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
        <div className="home__loads loads">
            <h2 className="loads__title">You can create a load</h2>
            <div className="loads__modal">
                <div className="loads__fields">
                    <input type="text" name="width" className="loads__field field" placeholder="Width (cm)"
                    onChange={handleForm}/>
                    <input type="text" name="height" className="loads__field field" placeholder="Height (cm)"
                    onChange={handleForm}/>
                    <input type="text" name="length" className="loads__field field" placeholder="Depth (cm)"
                    onChange={handleForm}/>
                    <input type="text" name="payload" className="loads__field field" placeholder="Payload (kg)"
                    onChange={handleForm}/>
                    <textarea className="loads__field field-text-area" name="message" placeholder="Additional message"
                    onChange={handleForm}/>
                </div>
            </div>
            <i className="fas fa-box-open loads__icon"></i>
            <button
                className="loads__button button"
                onClick={handleCreateLoad}
                disabled={loading}>
                    Create
            </button>
            <Warning referance={warningRef} message={error}/>
            <Warning referance={successRef} message={successfulResponse}/>
        </div>
    )
};

export default Loads;