/*libs*/
import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/*other*/
import { logoutAction } from '../../store/actions/authActions/AuthActions';
import { resetFilms } from '../../store/actions/filmsActions/FilmsActions';
import Logo from '../../logo.svg';
import HomeIcon from '../../assets/home-icon.svg';
import SavedIcon from '../../assets/saved-icon.svg';
import AccountIcon from '../../assets/account-icon.svg';
import LogOut from '../../assets/logout-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import FilmsIcon from '../../assets/films-icon.svg';
import './style.css';

const Header = () => {
    const dispatcher = useDispatch();

    const handleLogout = () => {
        dispatcher(logoutAction());
        localStorage.clear();
    }

    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/search') {
            return dispatcher(resetFilms("search"))
        }
    }, [dispatcher, location.pathname]);

    return (
        <>
            <header className="header">
                <Link to="/" className="header__logo">
                    <img src={Logo} alt="Movie" />
                </Link>
                <div className="header__navigation">
                    <NavLink to="/" activeclassname="active">
                        <img src={HomeIcon} alt="Home" />
                    </NavLink>
                    <NavLink to="/films" activeclassname="active">
                        <img src={FilmsIcon} alt="Films Movies" />
                    </NavLink>
                    <NavLink to="/search" activeclassname="active">
                        <img src={SearchIcon} alt="Search Movies" />
                    </NavLink>
                    <NavLink to="/favourites" activeclassname="active">
                        <img src={SavedIcon} alt="Saved Movies" />
                    </NavLink>
                </div>
                <div className="header__profile">
                    <div className="header__account">
                        <img src={AccountIcon} alt="" />
                    </div>
                    <div className="header__logout" onClick={handleLogout}>
                        <span>Logout</span>
                        <img src={LogOut} alt="" />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;