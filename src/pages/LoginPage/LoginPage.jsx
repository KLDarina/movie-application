/*libs*/
import React from 'react';

/*components*/
import Form from '../../components/form/Form';

/*other*/
import './style.css';

const LoginPage = () => {
    return (
        <div className="login">
            <Form typeForm="login" titleForm="Login" />
        </div>
    )
}

export default LoginPage;