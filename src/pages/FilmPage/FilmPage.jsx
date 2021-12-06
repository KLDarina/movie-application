/*libs*/
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Progress } from 'antd';

/*components*/
import Header from '../../components/header/Header';
import Preloader from '../../components/preloader/Preloader';

/*other*/
import { API, API_IMAGE, API_KEY } from '../../constants';
import { changeFavourite } from '../FavouritePage/helper';
import EmptyImg from '../../assets/404-photo.png';
import './style.css';

const FilmPage = () => {
    const [current, setCurrent] = useState(null);
    const { filmId } = useParams();

    const API_CURRENT_FILM = `${API}movie/${filmId}?api_key=${API_KEY}`;

    const favouriteRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(API_CURRENT_FILM);
            const formattedData = await data.json();
            setCurrent(formattedData);
        };
        fetchData();
    }, [API_CURRENT_FILM]);

    return (
        <>
            {
                current ?
                    <div className="wrapper">
                        <Header />
                        <div className="film-page__main">
                            <div className="film-page__bg" style={{
                                backgroundImage: current.backdrop_path ?
                                    `url(${API_IMAGE}${current.backdrop_path})` :
                                    `url(${EmptyImg})`
                            }} />
                            <div className="film-page__title">{current.title}</div>
                            <div className="film-page__genres film-genres">
                                {current.genres.length > 0 ? current.genres.map(genre => (
                                    <div className="film-genre" key={genre.id}>#{genre.name}</div>
                                )
                                ) : null}
                            </div>
                            <div className="film-page__date">{current.release_date}</div>
                        </div>
                        <div className="film-page__about">
                            <div className="film-page__box">
                                <div className="film-page__photo" style={{
                                    backgroundImage: current.poster_path ?
                                        `url(${API_IMAGE}${current.poster_path})` :
                                        `url(${EmptyImg})`
                                }} />
                                <div className="film-page__progress">
                                    <Progress
                                        type="circle"
                                        strokeColor={{
                                            '0%': '#0feffd',
                                            '100%': '#e10856',
                                        }}
                                        percent={current.vote_average * 10}
                                    />
                                </div>
                            </div>
                            <div className="film-page__content">
                                <div
                                    className={
                                        localStorage.getItem("favourite").indexOf(filmId) !== -1
                                            ? "film-page__favourite favourite" : "film-page__favourite"
                                    }
                                    ref={favouriteRef}
                                    onClick={() => changeFavourite(favouriteRef, filmId)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 2L14.5 9.17778H22L16.1667 13.8222L18.25 21L12 16.7778L5.75 21L7.83333 13.8222L2 9.17778H9.5L12 2Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="film-page__name">{current.title}</div>
                                <div className="film-page__tagline">{current.tagline}</div>
                                <div className="film-page__description">{current.overview}</div>
                                <a className="film-page__site" rel="noreferrer" target="_blank" href={current.homepage}>{current.homepage}</a>
                                <div className="film-page__languages">
                                    {current.spoken_languages.length > 0 ? current.spoken_languages.map((lang, id) => (
                                        <div className="film-page__language" key={id}>{lang.name}</div>
                                    )) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Preloader />
            }
        </>
    )
}

export default FilmPage;