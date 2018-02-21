import React from 'react';
import './App.css';
import Login from './Login';
import Registration from './Registration';
import {Users} from './Users';
import {WalkingRoute} from './WalkingRoute';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const App = () => (
  <Router>
      <div className="container-fluid">
          <nav className="row navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ">
                      <li className="nav-item"><Link className="nav-link" to="/">Login</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/Registration">Registration</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/WalkingRoute">Add Route</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/Users">Users</Link></li>
                  </ul>
              </div>
          </nav>
          <Route exact path="/" component={Login}/>
          <Route path="/Registration" component={Registration}/>
          <Route path="/WalkingRoute" component={WalkingRoute}/>
          <Route path="/Users" component={Users}/>
      </div>
  </Router>
)

export default App;
