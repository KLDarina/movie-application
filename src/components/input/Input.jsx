/*libs*/
import React from 'react';

/*other*/
import './style.css';

const Input = ({ typeInput, classInput, handleInput, placeholderInput, valueInput }) => {
    return (
        <input
            type={typeInput}
            className={classInput}
            onChange={handleInput}
            placeholder={placeholderInput}
            value={valueInput}
        />
    )
}

export default Input;