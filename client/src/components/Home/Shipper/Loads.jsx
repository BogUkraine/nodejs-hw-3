import React, { useState, useContext, useEffect} from 'react';
import useHttp from '../../../hooks/http.hook';
import AuthContext from '../../../context/AuthContext';
import Warning from '../../Warning';

const Loads = () => {
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const [ form, setForm ] = useState({
        width: '',
        height: '',
        depth: '',
        payload: '',
        message: '',
    });

    const handleForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleCreateLoad = async () => {
        await request('/api/loads/add', 'POST', form, null);
    };

    return (
        <div className="home__loads loads">
            <h2 className="loads__title">You can create a load</h2>
            <div className="loads__modal">
                <div className="loads__fields">
                    <input type="text" name="width" className="loads__field field" placeholder="Width (cm)"
                    onChange={handleForm}/>
                    <input type="text" name="height" className="loads__field field" placeholder="Height (cm)"
                    onChange={handleForm}/>
                    <input type="text" name="depth" className="loads__field field" placeholder="Depth (cm)"
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
                onClick={handleCreateLoad}>
                    Create
            </button>
        </div>
    )
};

export default Loads;