/*libs*/
import React from 'react';
import { Link } from 'react-router-dom';

/*other*/
import { API_IMAGE } from '../../constants';
import EmptyImg from '../../assets/404-photo.png';
import './style.css';

const FilmCard = ({ film }) => {
    return (
        <Link to={`/films/${film.id}`} className="film-card">
            <div className="film-photo" style={{
                backgroundImage: film.backdrop_path ?
                    `url(${API_IMAGE}${film?.backdrop_path})` :
                    `url(${EmptyImg})`
            }}/>
            <Link to={`/films/${film.id}`} className="button film-button">More</Link>
            {film.release_date ? (<div className="film-date">{film.release_date}</div>) : null}
            <div className="film-content">
                <div className="film-name">{film.title}</div>
            </div>
        </Link>
    )
}

export default FilmCard;