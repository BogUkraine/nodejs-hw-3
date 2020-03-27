import React from 'react';

const SidebarMain = ({changePasswordHandler, buttonChangePassword,
    choosePhotoHandler, buttonChoosePhoto, fileInput, loading}) => {
    return (
        <>
            <button 
                className="sidebar__changer button sidebar__changer--visible"
                onClick={changePasswordHandler}
                ref={buttonChangePassword}
                disabled={loading}>
                    Change password
            </button>
            <button 
                className="sidebar__changer button sidebar__changer--visible"
                onClick={choosePhotoHandler}
                ref={buttonChoosePhoto}
                disabled={loading}>
                    Choose photo
            </button>
            <input
                type="file"
                className="sidebar__file"
                ref={fileInput}
                accept=".png, .jpg, .jpeg"/>
        </>
    )
};

export default SidebarMain;