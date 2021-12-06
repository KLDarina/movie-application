import { USERS } from "../../../constants";
import { AuthTypes } from "../../types/AuthTypes";

const initialState = {
    isAuth: false,
    users: USERS
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case AuthTypes.LOGIN:
            return {
                ...state,
                isAuth: action.payload
            };
        case AuthTypes.LOGOUT:
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;
    }
}