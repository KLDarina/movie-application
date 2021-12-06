/*libs*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*components*/
import Button from '../button/Button';
import Input from '../input/Input';
import Preloader from '../preloader/Preloader';

/*other*/
import { loginAction } from '../../store/actions/authActions/AuthActions';
import './style.css';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { users } = useSelector(({ auth: { users } }) => ({
        users
    }));

    const dispatcher = useDispatch();

    const changeInput = (e, state) => {
        return state(e.target.value);
    }

    const changeButton = (e) => {
        e.preventDefault();
        setPasswordError(false);
        setEmailError(false);
        const findUserByEmail = users.find(user => user.email === email);
        if (findUserByEmail) {
            if (findUserByEmail.password === password) {
                setLoading(true);
                setTimeout(() => {
                    localStorage.setItem("favourite", JSON.stringify([]));
                    setLoading(false);
                    dispatcher(loginAction());
                }, 2000);
            } else {
                setPasswordError(true);
            }
        } else {
            setEmailError(true);
        }
    }

    const checkLoading = () => {
        return loading ? <Preloader /> : null;
    }

    return (
        <>
            {checkLoading()}
            <form className="form">
                <h1 className="form__title">Login</h1>
                <Input
                    typeInput="email"
                    classInput={`input error-${emailError}`}
                    placeholderInput="Email"
                    valueInput={email}
                    handleInput={(e) => changeInput(e, setEmail)}
                />
                <Input
                    typeInput="password"
                    classInput={`input error-${passwordError}`}
                    placeholderInput="Password"
                    valueInput={password}
                    handleInput={(e) => changeInput(e, setPassword)}
                />
                <Button textButton="Login" handleButton={(e) => changeButton(e)} />
            </form>
        </>
    )
}

export default Form;