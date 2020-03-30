import React, { useState, useContext, useEffect , useRef } from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import Warning from './Warning';

const Auth = () => {
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const shipperSection = useRef();
    const driverSection = useRef();
    const warningRef = useRef();
    const [ isActiveShipper, setIsActiveShipper ] = useState(true);
    const [ form, setForm ] = useState({
        login: '',
        password: '',
    });

    const handleForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        if(isActiveShipper) {
            try {
                const data = await request('/api/auth/register', 'POST', {...form, role: 'Shipper'});
                auth.login(data.token, data.userId, data.role, data.login);
            }
            catch(error){
                console.log('Something went wrong');
            };
        }
        else {
            try {
                const data = await request('/api/auth/register', 'POST', {...form, role: 'Driver'});
                auth.login(data.token, data.userId, data.role, data.login);
            }
            catch(error){
                console.log('Something went wrong');
            };
        }
    };

    const loginHandler = async () => {
        if(isActiveShipper) {
            try {
                const data = await request('/api/auth/login', 'POST', {...form, role: 'Shipper'});
                auth.login(data.token, data.userId, data.role, data.login);
            }
            catch(error){
                console.log('Something went wrong');
            };
        }
        else {
            try {
                const data = await request('/api/auth/login', 'POST', {...form, role: 'Driver'});
                auth.login(data.token, data.userId, data.role, data.login);
            }
            catch(error){
                console.log('Something went wrong');
            };
        }
    };

    const sectionHandler = (event) => {
        if (event.target.className === 'modal__section modal__section--unactive') {
            if(event.target === shipperSection.current) {
                setIsActiveShipper(true);
                driverSection.current.className = 'modal__section modal__section--unactive';
                shipperSection.current.className = 'modal__section modal__section--active';
            }
            else {
                setIsActiveShipper(false);
                driverSection.current.className = 'modal__section modal__section--active';
                shipperSection.current.className = 'modal__section modal__section--unactive';
            }
        }        
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

    return (
        <div className="auth">
            <div className="auth__modal modal">
                <div className="modal__header">
                    <div className="modal__section modal__section--active"
                        onClick={(event) => sectionHandler(event)}
                        ref={shipperSection}
                        >Continue as shipper
                    </div>
                    <div className="modal__section modal__section--unactive"
                        onClick={(event) => sectionHandler(event)}
                        ref={driverSection}
                        >Continue as driver
                    </div>
                </div>
                <div className="modal__description">
                    <input
                        type="text"
                        className="modal__login field"
                        placeholder="Login"
                        name="login"
                        onChange={handleForm}/>
                    <input
                        type="password"
                        className="modal__password field"
                        placeholder="Password"
                        name="password"
                        onChange={handleForm}/>
                </div>
                <div className="modal__footer">
                    <button
                        className="modal__button button button--login"
                        onClick={loginHandler}
                        disabled={loading}
                        >Log in</button>
                    <button
                        className="modal__button button button--sign"
                        onClick={registerHandler}
                        disabled={loading}
                        >Sign in</button>
                </div>
            </div>
            <Warning referance={warningRef} message={error}/>
        </div>
    )
}

export default Auth;