import { AuthTypes } from "../../types/AuthTypes"

export const loginAction = () => {
    return {
        type: AuthTypes.LOGIN,
        payload: true
    }
}

export const logoutAction = () => {
    return {
        type: AuthTypes.LOGOUT,
        payload: false
    }
}