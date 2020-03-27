import React from 'react';

const SidebarMain = ({modalPassword, handleForm, 
    handleChangePassword, loading, hideModalHandler}) => {
    return (
        <div className="sidebar__modal sidebar__modal--invisible" ref={modalPassword}>
            <input
                type="password"
                className="sidebar__field field"
                placeholder="Write new password"
                onChange={handleForm}/>
            <div className="sidebar__buttons">
                <button
                    className="button"
                    onClick={handleChangePassword}
                    disabled={loading}>
                        Save
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

export default SidebarMain;