import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        const userName = JSON.parse(localStorage.getItem('email'));
        return (
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
                    <div className="collapse navbar-collapse justify-content-end">
                        <div className="font-weight-bold">You authorized as &nbsp;</div>
                        <div>{userName}&nbsp;&nbsp; </div>
                        <Link to = "/" onClick={()=>localStorage.clear()} className="text-dark">&#x2718;</Link>
                    </div>
                </nav>
            </div>
        )
    }
}