export const AddFavourite = (refElem, favouriteId) => {
    const oldFavourites = JSON.parse(localStorage.getItem("favourite"));
    oldFavourites.push(favouriteId);
    localStorage.setItem("favourite", JSON.stringify(oldFavourites));
    refElem.current.classList.add("favourite");
}

export const RemoveFavourite = (refElem, favouriteId) => {
    const oldFavourites = JSON.parse(localStorage.getItem("favourite"));
    oldFavourites.splice(oldFavourites.indexOf(`${favouriteId}`), 1);
    localStorage.setItem("favourite", JSON.stringify(oldFavourites));
    refElem.current.classList.remove("favourite");
}

export const CheckFavourites = (favouriteId) => {
    return localStorage.getItem("favourite").indexOf(favouriteId) !== -1 ? "film-page__favourite favourite" : "film-page__favourite"
}

export const changeFavourite = (refElem, favouriteId) => {
    if (refElem.current.classList.contains("favourite")) {
        RemoveFavourite(refElem, favouriteId);
    } else {
        AddFavourite(refElem, favouriteId);
    }
}