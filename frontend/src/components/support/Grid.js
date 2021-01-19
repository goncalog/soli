import React from 'react';

export default function Grid(props) {
    return (
        <div className="grid">
            {props.content.map((components) => {
                return (
                    <div className="grid-element">{components}</div>
                );
            })}
        </div>
    );
}
