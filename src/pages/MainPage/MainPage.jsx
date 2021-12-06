/*libs*/
import React, { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';

/*components*/
import Header from '../../components/header/Header';
import Preloader from '../../components/preloader/Preloader';
import FilmCard from '../../components/filmCard/FilmCard';
import Slider from '../../components/slider/Slider';

/*other*/
import { API, API_IMAGE, API_KEY, CURRENT_YEAR } from '../../constants';
import { setFilms, setGenres } from '../../store/actions/filmsActions/FilmsActions';
import './style.css';

const MainPage = () => {
    const dispatcher = useDispatch();

    const { loading, films, genres } = useSelector(({ data: { data: { films, genres, loading } } }) => ({
        films, genres, loading
    }));

    const API_LATEST = `${API}movie/now_playing?api_key=${API_KEY}`;
    const API_POPULAR = `${API}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&year=${CURRENT_YEAR}`;
    const POPULAR_SLIDER = createRef();
    const LATEST_SLIDER = createRef();

    useEffect(() => {
        dispatcher(setGenres());
        dispatcher(setFilms('popular', API_POPULAR, null, null, null));
        dispatcher(setFilms('latest', API_LATEST, null, null, null));
    }, [dispatcher, API_POPULAR, API_LATEST]);

    const spawnPopularFilms = () => {
        if (films.popular) {
            return films.popular.map(slide => (
                <div className="popular-slider__item" key={slide.id}>
                    <div className="popular-slider__bg" style={{ backgroundImage: `url(${API_IMAGE}${slide.backdrop_path})` }} />
                    <div className="popular-slider__box">
                        <div className="popular-slider__photo" style={{ backgroundImage: `url(${API_IMAGE}${slide.poster_path})` }}>
                            <div className="popular-slider__progress">
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#0feffd',
                                        '100%': '#e10856',
                                    }}
                                    percent={slide.vote_average * 10}
                                />
                            </div>
                        </div>
                        <div className="popular-slider__content">
                            <div className="popular-slider__name">{slide.title}</div>
                            <div className="popular-slider__description">{slide.overview}</div>
                            <div className="popular-slider__genres">
                                {genres.length > 0 ? slide.genre_ids.map(id => {
                                    const name = genres.find(el => el.id === id);
                                    return (
                                        <div className="popular-slider__genre" key={id}>#{name.name}</div>
                                    );
                                }) : null}
                            </div>
                            <Link to={`/films/${slide.id}`} className="button popular-slider__button">More</Link>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    const spawnLatestFilms = () => {
        if (films.latest) {
            return films.latest.results.map(film => (
                <div className="latest-slider__item" key={film.id}>
                    <FilmCard film={film} />
                </div>
            ))
        }
    }

    const popularSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    const latestSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                }
            },
        ]
    }

    return (
        <>
            {
                loading ? <Preloader /> :
                    <div className="wrapper">
                        <Header />
                        <div className="main">
                            <div className="popular">
                                <div className="main__title popular__title">
                                    The most popular in {CURRENT_YEAR}
                                </div>
                                <Slider
                                    typeSlider="popular"
                                    refSlider={POPULAR_SLIDER}
                                    handleSlider={spawnPopularFilms}
                                    settingsSlider={popularSettings}
                                />
                            </div>
                            <div className="latest">
                                <div className="main__title">Latest Movies</div>
                                <Slider
                                    typeSlider="latest"
                                    refSlider={LATEST_SLIDER}
                                    handleSlider={spawnLatestFilms}
                                    settingsSlider={latestSettings}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default MainPage;