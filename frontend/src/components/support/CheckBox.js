import React from 'react';

export default function CheckBox(props) {
    function handleChange(e) {
        props.onChange(e.target.id);
    }

    return (
        <div className="checkbox">
            {props.options.map((item, key) => {
                return (
                    <div key={item._id}>                            
                        <label htmlFor={item._id}>
                            <input 
                                type="checkbox" 
                                key={item._id} 
                                id={key} 
                                value={item._id} 
                                checked={item.checked}
                                onChange={handleChange}
                            >
                            </input>
                            {`${item.name ? item.name : item.country}`}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
