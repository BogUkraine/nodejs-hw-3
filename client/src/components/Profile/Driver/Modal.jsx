import React, {useState} from 'react';

const Modal = ({referance, loading, setNewName, itemToChange}) => {
    const [changeField, setChangeField] = useState('');
    const handleClose = () => {
        referance.current.className = 'modal__overlay modal__overlay--hidden';
    };
    
    const handleChangeNameField = (event) => {
        setChangeField(event.target.value);
    }

    return (
        <div className="modal__overlay modal__overlay--hidden" ref={referance}>
            <div className="modal">
                <div className="modal__header">
                    <h2 className="modal__title">Change truck name</h2>
                </div>
                <div className="modal__description">
                    <input
                        type="text"
                        className="modal__field field"
                        placeholder="Change name"
                        onChange={handleChangeNameField}/>
                </div>
                <div className="modal__footer">
                    <button className="modal__button button"
                    disabled={loading}
                    onClick={() => setNewName(changeField,itemToChange._id)}>
                        Change
                    </button>
                    <button className="modal__button button"
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