import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { LoginContext } from './LoginContext';

function App() {

  const initialstate = {
    loggedIn: false,
    id: '',
    user: '',
    post: 'i have a good memory',
  }

  const [state, setState] = useState(initialstate);

  return (
    <Router>
      <div className="app">
        <LoginContext.Provider value={{state, setState}}>
          <NavBar />
        </LoginContext.Provider>
        <Switch>
          <LoginContext.Provider value={{state, setState}}>
            <Route exact path="/" component={Home}/>
            <Route path="/Login" component={Login}/>
            <Route path="/SignUp" component={SignUp}/>
          </LoginContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;