import React, { Component } from 'react';
import Header from './header';

export default class Registration extends React.Component {
    constructor() {
      super();
      this.state = {
        email:'',
        password:'',
        users:[]
      }
      this.verification = this.verification.bind(this)
    }
  
    componentDidMount() {
      fetch("http://localhost:3001/users")
          .then(response => response.json())
          .then(data => {this.setState({users: data})
        })  
    };

    verification(e) {
      for (let i = 0; i<this.state.users.length;i++) {
        if(this.state.users[i].email===this.state.email) {
            e.preventDefault();
            return alert('This email exist!');
        } else {
            console.log("No matches");
        }
    }
        localStorage.setItem('email', JSON.stringify(this.state.email));
        fetch("http://localhost:3001/users",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                   method: "POST",
                    body: JSON.stringify({email :this.state.email, password: this.state.password})
            }
        );
        let path = '/Users';
        this.props.history.push(path);
    }

    render() {
      return (
        <div>
          <Header/>
          <form className="container w-50" onSubmit={this.verification}>
                    <div className="d-flex justify-content-center"><h1>Registration</h1></div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter you email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter you password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary px-2" >Registration</button>
                    </div>
                </form>
        </div>
      );
    }
  }
  
  