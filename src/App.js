import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import {Users} from './Users';
import WalkingRoute from './WalkingRoute';
import './App.css';

export default class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route path="/Registration" component={Registration}/>
                    <Route path="/WalkingRoute" component={WalkingRoute}/>
                    <Route path="/Users" component={Users}/>
                </div>    
            </Router>
        )
    }
}



