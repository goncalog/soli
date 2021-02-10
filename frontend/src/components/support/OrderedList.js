import React from 'react';
import Image from './Image';

export default function OrderedList(props) {
    return (
        <div className="ordered-list">
            <ol>
                {props.listItems.map((item, i) => {
                    const listItem = props.icons
                        ? [
                            <Image key={i} imagePath={props.icons[i]} />,
                            <p key={i}>{item}</p>
                        ]
                        :
                            <li key={i}>{item}</li>;

                    return (
                        <div className="ordered-list-item" key={i}>
                            {listItem}
                        </div>
                    );
                })}
            </ol>
        </div>
    );
}
