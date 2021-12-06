/*libs*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*components*/
import Header from '../../components/header/Header';
import Preloader from '../../components/preloader/Preloader';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import PaginationComponent from '../../components/pagination/Pagination';
import FilmCard from '../../components/filmCard/FilmCard';

/*other*/
import { API, API_KEY } from '../../constants';
import { setFilms, setGenres } from '../../store/actions/filmsActions/FilmsActions';
import './style.css';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');

    const dispatcher = useDispatch();

    const { loading, films, options } = useSelector(({ data: { data: { films, loading, options } } }) => ({
        films, loading, options
    }));

    const handleInput = (e) => {
        setSearchValue(e.target.value);
    }

    const handleFilms = (page, perPage) => {
        const API_SEARCH = `${API}search/movie?api_key=${API_KEY}&query=${searchValue}&page=`;
        dispatcher(setGenres());
        dispatcher(setFilms('search', API_SEARCH, page, perPage, null));
    }

    const handleButton = (e, page, perPage) => {
        e.preventDefault();
        return searchValue.length > 0 ?
            handleFilms(page, perPage) : null;
    }

    const spawnFilms = () => {
        if (films.search) {
            if (films.search.results.length > 0 && options.perPage) {
                return (
                    <>
                        <div className="search-main__block">
                            {films.search.results.map((film, index) => {
                                return (index + 1 <= options.perPage) ?
                                    (
                                        <div className="films-main__item" key={film.id}>
                                            <FilmCard film={film} />
                                        </div>
                                    )
                                    : null
                            })}
                        </div>
                        <PaginationComponent
                            totalFilms={films.search?.total_pages}
                            changeFilms={handleFilms}
                            type="search"
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <div className="search-main__block">
                            <span>Oops, we didn't find a movie like that...</span>
                        </div>
                    </>
                )
            }
        } else {
            return (<div className="search-main__default" />)
        }
    }
    return (
        <>
            {
                loading ? <Preloader /> :
                    <div className="wrapper">
                        <Header type="search-none" />
                        <div className="search-main">
                            <div className="search-main__search">
                                <Input
                                    typeInput="text"
                                    placeholderInput="Search..."
                                    classInput="input"
                                    handleInput={handleInput}
                                    valueInput={searchValue}
                                />
                                <Button
                                    textButton="Start"
                                    handleButton={(e) => handleButton(e, 1, 10)}
                                />
                            </div>
                            {spawnFilms()}
                        </div>
                    </div>
            }
        </>
    )
}

export default SearchPage;