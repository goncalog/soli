import React from 'react';

export default function Grid(props) {
    return (
        <div className="grid">
            {props.content.map((components, i) => {
                return (
                    <div className="grid-element" key={i}>{components}</div>
                );
            })}
        </div>
    );
}
