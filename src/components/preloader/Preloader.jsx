/*libs*/
import React from 'react';

/*other*/
import './style.css';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="loader">
                <div id="d1"></div>
                <div id="d2"></div>
                <div id="d3"></div>
                <div id="d4"></div>
                <div id="d5"></div>
            </div>
        </div>
    )
}

export default Preloader;