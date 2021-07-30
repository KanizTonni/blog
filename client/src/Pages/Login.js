import React, {useState, useContext, useEffect} from 'react';
import Axios from 'axios';
import './LoginSignup.css';
import { LoginContext } from '../LoginContext';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const history = useHistory();
    const {state, setState} = useContext(LoginContext);

    const [loginStatus, setLoginStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const storeItem = (response) => {
        localStorage.setItem('loggedIn',JSON.stringify(true));
        localStorage.setItem('id',JSON.stringify(response.data[0].id));
        localStorage.setItem('user',JSON.stringify(response.data[0].username));
        localStorage.setItem('full_name',JSON.stringify(response.data[0].full_name));
        localStorage.setItem('phone',JSON.stringify(response.data[0].phone));
    }
    
    const handleLogin = (response) => {
        storeItem(response);
        history.push('./');
    }


    const login = () => {
        if(username && password) {
            Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
            }).then((response) => {
                if(response.data.message){
                    setLoginStatus(response.data.message)
                } else {
                    handleLogin(response);
                }
            }, (error) => {
                console.log(error);
            });
        } else {
            setLoginStatus('Input fields are empty')
        }
    };

    return (
        <div className="container">
            <h1>Log in</h1>
            <div className="form">
                <label>Username:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={login} type="submit" value="Submit">Log in</button>
            </div>
            <h1>{state.user}</h1>
        </div>
    )
}
