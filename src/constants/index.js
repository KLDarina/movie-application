const API = "https://api.themoviedb.org/3/";
const API_KEY = "bb0cb1f3821a9d32407f6d6037f15c85";
const API_IMAGE = "https://image.tmdb.org/t/p/original/";

const USERS = [
    {
        email: 'vlad@gmail.com',
        password: 'qwerty'
    },
    {
        email: 'vasya@gmail.com',
        password: '123456'
    },
];

const CURRENT_YEAR = new Date().getFullYear();

export { API, API_KEY, API_IMAGE, USERS, CURRENT_YEAR };