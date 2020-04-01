import React, {useState} from 'react';

const Modal = ({referance, loading, setShouldUpdate, shouldUpdate, request, auth, itemToChange}) => {
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

    const handleClose = () => {
        referance.current.className = 'modal__overlay modal__overlay--hidden';
    };

    const handleChange = async (item) => {
        await request(
            `/api/loads/${item._id}/data`,
            'PUT',
            {
                dimensions: {
                    width: form.width,
                    height: form.height,
                    length: form.length,
                },
                message: form.message,
                payload: form.payload,
            },
            {Authorization: `Bearer ${auth.token}`})
        setShouldUpdate(!shouldUpdate);
    }

    return (
        <div className="modal__overlay modal__overlay--hidden" ref={referance}>
            <div className="modal--big">
                <h2 className="loads__title">You can change load info</h2>
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
                    <i className="fas fa-box-open loads__icon"></i>
                </div>
                <div className="loads__footer">
                    <button
                        className="loads__button button"
                        disabled={loading}
                        onClick={() => handleChange(itemToChange)}>
                            Change
                    </button>
                    <button
                        className="loads__button button"
                        onClick={handleClose}
                        disabled={loading}>
                            Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;