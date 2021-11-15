import React from "react";
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES=['btn--primary', 'btn--outline'];

const SIZES=['btn--medium','btn--large'];

export const Button = ({link,children, type, onClick, buttonStyle, buttonSize,className}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return(
        <Link to={link} className='btn-mobile'>
            <button className={[`btn ${checkButtonStyle} ${checkButtonSize}`,className].join(' ')} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>
    );
};

export const ButtonS = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return(
        <Link to='/predict' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>
    );
};


export const ButtonN = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return(
        <div className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} >
                {children}
            </button>
        </div>
    );
};




export const ButtonP = ({children, type, onClick}) => {
    return(
        <div className="new-b">
            <button className="btn-p" onClick={onClick} type={type}>
                {children}
            </button>
        </div>
    );
};