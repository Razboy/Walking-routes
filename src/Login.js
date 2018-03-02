import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header';

export default class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        email:'',
        password:'',
        users:[]
      }
      this.verification = this.verification.bind(this);
    }
    
    componentDidMount() {
      fetch("http://localhost:3001/users")
          .then(response => response.json())
          .then(data => {this.setState({users: data})});

      if (localStorage.getItem('email')!==null){
          this.props.history.push('/Users');
      }
    };

    verification (e) {
      for (let i = 0; i<this.state.users.length;i++) {
          if(this.state.users[i].email===this.state.email && this.state.users[i].password===this.state.password) {
              localStorage.setItem('email', JSON.stringify(this.state.email));
              localStorage.setItem('id', JSON.stringify(this.state.users[i].id));
              return this.props.history.push('/Users');
          } else {
              console.log("Failed to login");
          }
      }
      e.preventDefault();
      alert('Check the data for correctness');
    }
  
    render() {
      return (
        <div>
        <Header/>
        <form className="container w-50" onSubmit={this.verification}>
            <div className="column align-items-center">
                <div className="d-flex justify-content-center"><h1>Login</h1></div>
                <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter you email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary px-2">Login</button>
                </div>
                <div className="d-flex justify-content-end">
                    <Link className="nav-link" to="/Registration">You not registered? <br/> Clik here to go registration</Link>
                </div>
            </div>
        </form>
        </div>
      );
    }
  }
  