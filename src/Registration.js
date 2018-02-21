import React, { Component } from 'react';
import './App.css';

class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:'',
        users:[]
      }
      this.verification = this.verification.bind(this)
    }
  
    componentDidMount(){
      fetch("http://localhost:3001/users")
          .then(response => response.json())
          .then(data => {this.setState({users: data})
          console.log(data)
        })  
    };

    verification() {
        for (let i = 0; i<this.state.users.length; i++){
            if(this.state.users[i].email===this.state.email) {
                return alert('This email exist!');
            } else {
               return fetch("http://localhost:3001/users",
                  {
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      method: "POST",
                      body: JSON.stringify({email:this.state.email,password:this.state.password})
                  });  
                }
        }
    }

    render() {
      return (
        <div>
          <div className="registration">
            <h1>Registration</h1>
            <div className="offset-2 col-md-8">
              <input className="form-control" value={this.state.email} 
              onChange={(e)=>this.setState({email:e.target.value})}
              type="email" placeholder="Enter you email here"></input>
              <br/>
              <input className="form-control" value={this.state.password} 
              onChange={(e)=>this.setState({password:e.target.value})}
              type="password" placeholder="Place you password here"></input>
              <br/>
              <button onClick={()=>{
                  if (this.state.email === "" || this.state.password === "") {
                      return alert('Some field is empty!')
                  } else {
                    this.verification();
                  }
                }
                }>Submit</button>
            </div>
          </div>
          
        </div>
      );
    }
  }
  
  export default Registration;