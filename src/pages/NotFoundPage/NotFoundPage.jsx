/*libs*/
import React from 'react';
import { Link } from 'react-router-dom';

/*other*/
import NotFoundImg from '../../assets/404.png';
import './style.css';

const NotFoundPage = () => {
    return (
        <div className="page-not-found">
            <img src={NotFoundImg} alt="" className="page-not-found__img" />
            <div className="page-not-found__text">Sorry, it looks like the page get lost</div>
            <div className="page-not-found__untext">(or someone has stolen it recently)</div>
            <Link to="/" className="button">Go to home</Link>
        </div>
    )
}

export default NotFoundPage;