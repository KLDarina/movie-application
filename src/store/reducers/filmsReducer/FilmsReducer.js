import { FilmsTypes } from "../../types/FilmsTypes";
import { GenresTypes } from "../../types/genresTypes";

const initialState = {
    data: {
        loading: false,
        error: false,
        films: {
            all: null,
            search: null,
            popular: null,
            latest: null,
            favourites: []
        },
        genres: null,
        filters: {
            sortBy: ''
        },
        options: {
            page: 1,
            perPage: 10
        }
    }
}

export default function FilmsReducer(state = initialState, action) {
    switch (action.type) {
        case FilmsTypes.SET_LOADING:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: action.payload
                }
            };
        case FilmsTypes.GET_FILMS_SUCCESS:
            const key = action.payload.type;
            return {
                ...state,
                data: {
                    ...state.data,
                    films: {
                        ...state.data.films,
                        [key]: action.payload.data
                    },
                    filters: {
                        ...state.data.filters,
                        sortBy: action.payload.sortBy ? action.payload.sortBy : state.data.filters.sortBy,
                    },
                    options: {
                        ...state.data.options,
                        page: action.payload.page ? action.payload.page : state.data.options.page,
                        perPage: action.payload.perPage ? action.payload.perPage : state.data.options.perPage
                    }
                }
            }
        case FilmsTypes.GET_FILMS_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload
                }
            };
        case GenresTypes.GET_GENRES_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    genres: action.payload
                }
            };
        case GenresTypes.GET_GENRES_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload
                }
            };
        default:
            return state;
    }
}