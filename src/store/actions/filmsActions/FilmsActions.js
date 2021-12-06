import { API, API_KEY } from "../../../constants"
import { FilmsTypes } from "../../types/FilmsTypes"
import { GenresTypes } from "../../types/genresTypes"

export const loadingFilmsAction = (value) => {
    return {
        type: FilmsTypes.SET_LOADING,
        payload: value
    }
}

export const getFilmsSuccessAction = (type, data, page, perPage, sortBy) => {
    return {
        type: FilmsTypes.GET_FILMS_SUCCESS,
        payload: { type, data, page, perPage, sortBy }
    }
}

export const getFilmsFailureAction = (error) => {
    return {
        type: FilmsTypes.GET_FILMS_ERROR,
        payload: error
    }
}

export const setFilms = (type, api, page, perPage, sortBy) => async (dispatch) => {
    dispatch(loadingFilmsAction(true));
    try {
        let data;
        if (type === "all") {
            data = await fetch(`${api}${page}&sort_by=${sortBy}`);
        } else if (type === "search") {
            data = await fetch(api + +page);
        } else {
            data = await fetch(api);
        }

        const formattedData = await data.json();
        let finalData = formattedData;
        if (type === "popular") {
            finalData = formattedData.results.slice(0, 5);
        }
        dispatch(getFilmsSuccessAction(type, finalData, page, perPage, sortBy));
    } catch (e) {
        console.log(e);
        dispatch(getFilmsFailureAction(true));
    } finally {
        dispatch(loadingFilmsAction(false));
    }
}

export const resetFilms = (type) => async (dispatch, getState) => {
    dispatch(getFilmsSuccessAction(type, null, null, null));
}

export const getGenresSuccessAction = (data) => {
    return {
        type: GenresTypes.GET_GENRES_SUCCESS,
        payload: data
    }
}

export const getGenresFailureAction = (error) => {
    return {
        type: GenresTypes.GET_GENRES_ERROR,
        payload: error
    }
}

export const setGenres = () => async (dispatch) => {
    try {
        const data = await fetch(`${API}genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const formattedData = await data.json();
        const finalData = formattedData.genres;
        dispatch(getGenresSuccessAction(finalData));
    } catch (e) {
        console.log(e);
        dispatch(getGenresFailureAction(true));
    }
}