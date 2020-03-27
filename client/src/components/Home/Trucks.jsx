import React from 'react';

const Trucks = ({handleLargeCreate, handleSmallCreate, handleSprinterCreate, loading}) => {
    return (
        <div className="home__trucks trucks">
            <div className="trucks__item">
                <div className="trucks__description">
                    <h2 className="trucks__title">Sprinter</h2>
                    <p className="trucks__characteristic characteristic">
                        <span className="characteristic__item">
                            Size: 300&#x2715;250&#x2715;170
                        </span>
                        <span className="characteristic__item">
                            Allowing weight: 1700 kg
                        </span>
                    </p>
                    <i className="fas fa-truck-pickup trucks__icon"></i>
                </div>
                <button
                    className="trucks__button button"
                    disabled={loading}
                    onClick={handleSprinterCreate}>
                        Create
                </button>
            </div>
            <div className="trucks__item">
                <div className="trucks__description">
                    <h2 className="trucks__title">Small straight</h2>
                    <p className="trucks__characteristic characteristic">
                        <span className="characteristic__item">
                            Size: 500&#x2715;250&#x2715;170
                        </span>
                        <span className="characteristic__item">
                            Allowing weight: 2500 kg
                        </span>
                    </p>
                    <i className="fas fa-truck trucks__icon"></i>
                </div>
                <button
                    className="trucks__button button"
                    disabled={loading}
                    onClick={handleSmallCreate}>
                        Create
                </button>
            </div>
            <div className="trucks__item">
                <div className="trucks__description">
                    <h2 className="trucks__title">Large straight</h2>
                    <p className="trucks__characteristic characteristic">
                        <span className="characteristic__item">
                            Size: 700&#x2715;350&#x2715;200
                        </span>
                        <span className="characteristic__item">
                            Allowing weight: 4000 kg
                        </span>
                    </p>
                    <i className="fas fa-truck-moving trucks__icon"></i>
                </div>
                <button
                    className="trucks__button button"
                    disabled={loading}
                    onClick={handleLargeCreate}>
                        Create
                </button>
            </div>
        </div>
    )
}

export default Trucks;