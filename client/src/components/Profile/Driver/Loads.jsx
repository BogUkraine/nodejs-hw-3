import React from 'react';

const Loads = ({loads, loading, handleShipped}) => {
    return (
        loads.map((item, index) => {
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
                            <p className="profile-loads__text">Additional message: {item.message}</p>
                        </div>
                        : null}
                    </div>
                    <div className="profile-loads__buttons">
                        {item.status === 'ASSIGNED'
                        ? 
                        <>
                            <button
                                className="profile-loads__button button"
                                disabled={loading}
                                onClick={() => handleShipped(item)}>
                                    I shipped load
                            </button>
                        </>
                        : <h2 className="profile-loads__title">{item.status}</h2>}
                    </div>
                </div>
            )
        })
    )
}

export default Loads;