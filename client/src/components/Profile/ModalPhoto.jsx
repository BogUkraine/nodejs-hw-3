import React from 'react';

const ModalPhoto = ({modalPhoto, changePhotoHandler, loading, hideModalHandler}) => {
    return (
        <div className="sidebar__modal sidebar__modal--invisible" ref={modalPhoto}>
            <div className="sidebar__buttons">
                <button 
                    className="sidebar__changer button sidebar__changer--visible"
                    onClick={changePhotoHandler}
                    disabled={loading}>
                    Change photo
                </button>
                <button
                    className="button"
                    onClick={hideModalHandler}
                    disabled={loading}>
                        Cancel
                </button>
            </div>
        </div>
    )
};

export default ModalPhoto;