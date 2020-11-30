import React from 'react'

const Span = ({
    value,
    id,
    onClick,
    className,
    disabledClass,
    disabledButton,

}) => {
    let spanDisableDeleteButton = disabledButton
        ? disabledClass
        : ""
    let spanOnClick = onClick
        ? onClick
        : () => { }
    // let spanOnClick;
    // if (!onClick) {
    //     spanOnClick=() => {}
    // } else {
    //     spanOnClick = onClick;
    // }

    return (
        <span
            className={`
        ${className} 
        ${spanDisableDeleteButton}`}
            onClick={() => spanOnClick(id)}>
            {value}
        </span>

    )
}

export default Span;
