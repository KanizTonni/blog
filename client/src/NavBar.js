import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from './LoginContext';

import './NavBar.css';

export default function NavBar() {

    const {state, setState} = useContext(LoginContext);

    const storeItem = (response) => {
        localStorage.setItem('loggedIn',JSON.stringify(false));
        localStorage.setItem('user',JSON.stringify(''));
    }

    const handleLogout = () => {
        storeItem();
        setState({loggedIn: false});
        setState({user: ''});
    }

    useEffect(() => {
        let value = JSON.parse(localStorage.getItem('loggedIn'));
        setState({loggedIn: value});
    }, []);

    return (
        <nav className="navbar">
            <h1>Posts Site</h1>
            <p>{state.myname}</p>
            <div className="links">
                <Link className="link" to="/">Home</Link>
                {state.loggedIn ? (
                    <Link className="link" to="/" onClick={handleLogout}>Log out</Link>
                ) : (
                    <>
                    <Link className="link" to="/Login">Log in</Link>
                    <Link className="link" to="/SignUp">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}