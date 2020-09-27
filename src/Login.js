import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from './firebase';
import {useDispatch} from 'react-redux';
import {actionTypes} from './reducer';

function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            console.log(result);
            dispatch({type: actionTypes.SET_USER,user:result.user.displayName,dp:result.user.photoURL});
        })
        .catch(err => {
            alert(err.message);
        })
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1-1.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
