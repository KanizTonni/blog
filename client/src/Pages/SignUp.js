import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import './LoginSignup.css';
import { LoginContext } from '../LoginContext';

export default function SignUp() {
    
    const history = useHistory();

    const [full_name, setFull_name] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [phone, setPhone] = useState('');
    const [signUpmessage, setSignupMessage] = useState('');

    const storeItem = (response) => {
        localStorage.setItem('loggedIn',JSON.stringify(true));
        localStorage.setItem('id',JSON.stringify(response.data[0].id));
        localStorage.setItem('user',JSON.stringify(response.data[0].username));
    }
    
    {/**direct login after register */}
    const handleloginAfterSignup = (response) => {
        Axios.post('http://localhost:3001/login', {
            username: usernameReg,
            password: passwordReg,
            }).then((response) => {
                storeItem(response);
                history.push('./');
            }, (error) => {
                console.log(error);
            });
        
    }

    {/**registering */}
    const register = () => {
        if(full_name, usernameReg, passwordReg, phone){    
            Axios.post('http://localhost:3001/register', {
            full_name: full_name,
            username: usernameReg,
            password: passwordReg,
            phone: phone,
            }).then((response) => {
                handleloginAfterSignup()
            }, (error) => {
                console.log(error);
            });
        } else {
            setSignupMessage('All inputs must be filled')
        }
    };

    return (
        <div className="container">
            <h1>Sign up</h1>
            <div className="form">
                
                <label>Full Name:</label>
                <input 
                    onChange={(e) => setFull_name(e.target.value)}
                    type="text" 
                />

                <label>Username:</label>
                <input 
                    onChange={(e) => setUsernameReg(e.target.value)}
                    type="text"
                />

                <label>Password:</label>
                <input 
                    onChange={(e) => setPasswordReg(e.target.value)}
                    type="password"
                />

                <label>Phone:</label>
                <input 
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                />

                <button onClick={register} type="submit" value="Submit">Sign up</button>
                <p>{signUpmessage}</p>
            </div>
        </div>
    )
}
