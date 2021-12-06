/*libs*/
import React from 'react';

/*other*/
import './style.css';

const Button = ({ handleButton, textButton }) => {
    return (
        <button onClick={handleButton} className="button">{textButton}</button>
    )
}

export default Button;