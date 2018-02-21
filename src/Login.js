import React, { Component } from 'react';
import {Route} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:''
      }
    }
    
    componentDidMount() {
      if (localStorage.getItem('users')!==null) {
          this.props.history.push('/WalkingRoute');
      }
  }
  
  //   login(){
  //     console.log(this.state.email,this.state.password)
  //     let url = 'http://localhost:3001/users?email='+this.state.email+'&password='+this.state.password;
  //     fetch(url).then(response=>response.json()).then(res=>{
  //       if (res == null) {
  //         alert('Email or password are incorrect')
  //       } else {
  //     console.log(res)
  //     localStorage.setItem('todos', JSON.stringify(res));
  //     console.log(localStorage)     
  //   }})
  // }
    
    render() {
      return (
        <div className="App">
          <div className="login">
            <h1>Login</h1>
            <div className="offset-2 col-md-8">
              <input className="form-control" value={this.state.email} 
                onChange={(e)=>this.setState({email:e.target.value})} 
                type="email" placeholder="Enter you email here"></input>
              <br/>
              <input className="form-control" value={this.state.password}
                onChange={(e)=>this.setState({password:e.target.value})}
                type="password" placeholder="Enter you password here"></input>
              <br/>
              <Route render={({history}) => (
                    <button onClick={() => {
                        fetch("http://localhost:3001/users")
                            .then(users => users.json())
                            .then(usersData => {

                                let isExists = false;
                                if (this.state.email === '' || this.state.password === '') {
                                    alert('Enter a data');
                                    return;
                                }

                               for(let i = 0; i < usersData.length; i++){
                                    if(usersData[i].password === this.state.password && usersData[i].email === this.state.email) {
                                        localStorage.setItem('user',JSON.stringify(usersData[i].email));
                                        localStorage.setItem('id',JSON.stringify(usersData[i].id));
                                        console.log('User',localStorage.getItem('user'),'id',localStorage.getItem('id'));
                                        history.push('/WalkingRoute');
                                        isExists = true;
                                        break;
                                    }else {
                                        isExists = false;
                                    }
                               }

                               if(isExists === false){
                                    alert('Incorrect email or password')
                                    this.setState({email:'',password:''})
                               }
                            });
                    }}>Submit</button>
                  )}/>
            </div>
          </div>
        </div>
        
      );
    }
  }
  
  export default Login;