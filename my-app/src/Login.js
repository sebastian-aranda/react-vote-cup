import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BackendInterface from './Utils';
import styles from './Login.module.css'

const Login = ({ setToken }) => {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        return setToken(123); 
        const username = e.target.username.value; 
        const password = e.target.password.value;
        BackendInterface.login(username, password).then((res) => {
            if (res.token) {
                setToken(res.token);
            }
            else {
                setError(res.error);
            }
            
        });
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text"/> */}
                <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    // onChange={(e) => changeSignUpData('name', e.target.value)}
                />
                {/* <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/> */}
                <TextField
                    fullWidth
                    label="Password"
                    type="text"
                    // onChange={(e) => changeSignUpData('name', e.target.value)}
                />
                {/* <div className={styles.error}>{error}</div> */}
                <Button type="submit" variant='contained'>Login</Button>
            </form>
            
        </div>
    );
}

export default Login;
