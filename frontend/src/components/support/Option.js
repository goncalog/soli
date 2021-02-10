import React from 'react';

export default function Option(props) {
    function handleChange(e) {
        props.onChange(e.target.id);
    }

    return (
        <div className="option">
            {props.options.map((item, key) => {
                return (
                    <div key={item._id}>                            
                        <label htmlFor={item._id}>
                            <input 
                                type="radio" 
                                key={item._id} 
                                id={key}
                                value={item._id} 
                                checked={item.checked}
                                onChange={handleChange}
                            >
                            </input>
                            {`${item.name ? item.name : item.city}`}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
