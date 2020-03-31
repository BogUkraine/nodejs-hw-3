import React from 'react';
import { useState } from 'react';

const truckCards = [{
    type: 'Sprinter',
    sizes: {
        width: 170,
        height: 250,
        length: 300,
    },
    weight: 1700,
    icon: 'fas fa-truck-pickup trucks__icon',
    name: 'sprinter'
},
{
    type: 'Small straight',
    sizes: {
        width: 170,
        height: 250,
        length: 500,
    },
    weight: 2500,
    icon: 'fas fa-truck trucks__icon',
    name: 'small'
},
{
    type: 'Large straight',
    sizes: {
        width: 200,
        height: 350,
        length: 700,
    },
    weight: 4000,
    icon: 'fas fa-truck-moving trucks__icon',
    name: 'large'
},
]

const Trucks = ({handleCreate, loading}) => {
    const [form, setForm] = useState({
        sprinter: '',
        small: '',
        large: '',
    });

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    return (
        <div className="home__trucks trucks">
            {truckCards.map((item, index) => {
                return (
                    <div className="trucks__item" key={index}>
                        <div className="trucks__description">
                            <h2 className="trucks__title">{item.type}</h2>
                            <p className="trucks__characteristic characteristic">
                                <span className="characteristic__item">
                                    Sizes: {item.sizes.width}&#x2715;{item.sizes.height}&#x2715;{item.sizes.length}
                                </span>
                                <span className="characteristic__item">
                                    Allowing weight: {item.weight} kg
                                </span>
                            </p>
                            <i className={item.icon}></i>
                            <input
                                type="text"
                                className="characteristic__field field"
                                placeholder="Enter truck's name"
                                name={item.name}
                                onChange={handleChange}
                                />
                        </div>
                        <button
                            className="trucks__button button"
                            disabled={loading}
                            onClick={() => handleCreate(item, form[item.name])}>
                                Create
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Trucks;