import React from 'react';

export default function OrderedList(props) {
    return (
        <div className="ordered-list">
            <ol>
                {props.listItems.map((item, i) => {
                    return (
                        <li key={i}>{item}</li>
                    );
                })}
            </ol>
        </div>
    );
}
