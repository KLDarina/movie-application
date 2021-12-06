/*libs*/
import React, { useEffect, useState } from 'react';

/*components*/
import Header from '../../components/header/Header';
import Preloader from '../../components/preloader/Preloader';
import FilmCard from '../../components/filmCard/FilmCard';

/*other*/
import { API, API_KEY } from '../../constants';
import './style.css';

const FavouritePage = () => {
    const [favourites, setFavourites] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const favouritesId = JSON.parse(localStorage.getItem("favourite"));
        let tmpFavourites = [];
        (async () => {
            setLoading(true);
            await Promise.all(favouritesId.map(async (id) => {
                await fetch(`${API}movie/${id}?api_key=${API_KEY}`).then(async (val) => {
                    const formattedData = await val.json();
                    tmpFavourites.push(formattedData);
                    setFavourites(tmpFavourites);
                })
            }));
            setLoading(false);
        })()
    }, []);

    const spawnFilms = () => {
        if (favourites) {
            return favourites.map(film => (
                <div className="films-main__item" key={film.id}>
                    <FilmCard film={film} />
                </div>
            ))
        } else {
            return (
                <div className="favourites-empty">OOOPS, YOUR FAVOURITES LIST IS EMPTY...</div>
            );
        }
    }
    return (
        loading ? <Preloader /> :
            <div className="wrapper">
                <Header />
                <div className="films-main">
                    <div className="films-main__title">Favourites Films</div>
                    <div className="films-main__block">
                        {spawnFilms()}
                    </div>
                </div>
            </div>
    )
}

export default FavouritePage;