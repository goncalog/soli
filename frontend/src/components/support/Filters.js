import React from 'react';
import DropDown from './DropDown';

export default function Filters(props) {
    function handleClick(property) {
        props.onClick(property);
    }

    function handleTextChange(property, type, text) {
        props.onTextChange(property, type, text);
    }

    function handleOptionChange(property, i) {
        props.onOptionChange(property, i);
    }

    return (
        <div className="filters">
            <DropDown
                type="minMax" 
                property={props.return.property}
                title={props.return.title}
                onClick={handleClick}
                visibility={props.visibility.return}
                min={props.return.min}
                max={props.return.max}
                onTextChange={handleTextChange}
            />
            <DropDown 
                property={props.location.property}
                title={props.location.title}
                onClick={handleClick}
                options={props.location.options}
                visibility={props.visibility.location}
                onOptionChange={handleOptionChange}
            />
            <DropDown
                type="minMax" 
                property={props.size.property}
                title={props.size.title}
                onClick={handleClick}
                visibility={props.visibility.size}
                min={props.size.min}
                max={props.size.max}
                onTextChange={handleTextChange}
            />
            <DropDown 
                property={props.status.property}
                title={props.status.title}
                onClick={handleClick}
                options={props.status.options}
                visibility={props.visibility.status}
                onOptionChange={handleOptionChange}
            />
            <DropDown
                type="option"
                property={props.sort.property}
                title={props.sort.title}
                onClick={handleClick} 
                options={props.sort.options}
                visibility={props.visibility.sort}
                onOptionChange={handleOptionChange}
            />
        </div>
    );
}
