/*libs*/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*components*/
import PrivateRoute from './components/privateRoute/PrivateRoute';
import MainPage from './pages/MainPage/MainPage';
import FilmsPage from './pages/FilmsPage/FilmsPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import FilmPage from './pages/FilmPage/FilmPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

/*other*/
import './App.css';

function App() {

  const { isAuth } = useSelector(({ auth: { isAuth } }) => ({
    isAuth
  }));

  return (
    <Routes>
      <Route exact path='/login' element={<PrivateRoute auth={isAuth} isLoginPage={true} />}>
        <Route exact path='/login' element={<LoginPage />} />
      </Route>
      <Route exact path='/' element={<PrivateRoute auth={isAuth} isLoginPage={false} />}>
        <Route exact path='/' element={<MainPage />} />
      </Route>
      <Route exact path='/favourites' element={<PrivateRoute auth={isAuth} isLoginPage={false} />}>
        <Route exact path='/favourites' element={<FavouritePage />} />
      </Route>
      <Route exact path='/search' element={<PrivateRoute auth={isAuth} isLoginPage={false} />}>
        <Route exact path='/search' element={<SearchPage />} />
      </Route>
      <Route exact path='/films' element={<PrivateRoute auth={isAuth} isLoginPage={false} />}>
        <Route exact path='/films' element={<FilmsPage />} />
      </Route>
      <Route exact path='/films/:filmId' element={<PrivateRoute auth={isAuth} isLoginPage={false} />}>
        <Route exact path='/films/:filmId' element={<FilmPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
