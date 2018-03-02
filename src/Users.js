import React from 'react';
import Header from './header';
import {UserMap} from "./UserMap";
import ReactStars from 'react-stars';

export class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            routes: [],
            comments: [],
            id: 0,
            MapId: 0,
            description: '',
            rating: 0,
            AuthUser:'',
            AuthUserId:''
        }
    this.comments = this.comments.bind(this);
    };

    componentDidMount() {

        this.setState({
            AuthUser:JSON.parse(localStorage.getItem('email')),
            AuthUserId:JSON.parse(localStorage.getItem('id'))
        })
        fetch('http://localhost:3001/users')
        .then(response=>response.json())
        .then(res=>{ 
            this.setState({users:res})
        });
          fetch('http://localhost:3001/routes')
        .then(response=>response.json())
        .then(res=>{ 
            this.setState({routes:res})
            console.log(this.state.routes)
        });
          fetch('http://localhost:3001/comments')
        .then(response=>response.json())
        .then(res=>{ 
            this.setState({comments:res})
        });
    }

    comments(value,index) {
        fetch("http://localhost:3001/comments",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    UserId:this.state.AuthUserId,
                    rating:this.state.rating,
                    description:this.state.description,
                    routeId:this.state.MapId
                })
            });
            let comments = this.state.comments
            console.log(this.state.AuthUserId)
            comments.push({
                UserId:this.state.AuthUserId,
                rating:this.state.rating,
                description:this.state.description,
                routeId:this.state.MapId
            })   
            this.setState({comments:comments})
    }

    getUserName(id){
        let findUser = this.state.users.find((user,index)=>{
            return user.id===id
        })
        return findUser.email 
    }
    
render() {
    
    let users = this.state.users.map((users,index)=>{
        return (
            <li className="list-group-item list-group-item-action text-center" style={{cursor: 'pointer'}} 
            key={index} value={users.id}
            onClick={(e)=>this.setState({id:e.target.value})}
            >{users.email}</li>)
    })

    let routesList = this.state.routes.map((value,index)=> {
        if(this.state.id === value.user){
        return(
            <li className="list-group-item list-group-item-action text-center" style={{cursor: 'pointer'}} 
            key={index} value={value.id}
            onClick={(e)=>this.setState({MapId:e.target.value})}
            >{value.name}</li>)
        } else return(null)
    })

    let userdate = this.state.routes.map((value, i)=>{
        if(this.state.MapId === value.id ){
            return(
                <div key={i}>
                <UserMap 
                   markers={value.markers}
                   containerElement={<div style={{height: '700px', width:'900px', margin:'0 auto'}}/>}
                   mapElement={<div style={{height: '700px'}}/>}
                />
                   <div className="text-center">
                           <h5>Category: {value.category}</h5><br/>
                           <h5>Name: {value.name}</h5><br/>
                           <h5>Description: {value.description}</h5>
                    </div>
                        <br/>
                    <div className='text-center'>
                        {
                            JSON.parse(localStorage.getItem('email'))!==null?
                            (
                                <div>
                                <h3>Comment</h3>
                                    <textarea value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}></textarea><br/>
                                        <span style={{display: "table", margin: "0 auto"}}>
                                            <ReactStars count={10} size={24} value={this.state.rating} onChange={(e)=>this.setState({rating:e})}/>
                                        </span>
                                            <br/>
                                    <button onClick={()=>{
                                        this.comments()
                                        this.setState({description:''})
                                    }}>Add comment</button>
                                </div>
                            ):null
                        }
                    </div>
                       <br/>
                </div>
            )}
    });

    let comments = this.state.comments.map((value,index)=>{
        if(this.state.MapId===value.routeId) {
            return (
                <div key={index} className="list-group-item offset-1 col-md-10">
                    <h5>{this.getUserName(value.UserId)}</h5>
                    <p>{value.description}</p>
                    <span><ReactStars count={10} edit={false} size={24} value={value.rating}/></span>
                </div>
            )}
    })

    return(
        <div>
            <Header/>
            <h3 className="text-center">Registered Users</h3>
            <h5 className="text-center">(Click on user to show routes)</h5>
            <ul className="offset-3 col-md-6"> 
                {users}
            </ul>
                <br/>
            <ul className="offset-3 col-md-6">
                {routesList}
            </ul>    
            <ul className="text-center">
                {userdate}
            </ul>    
            <div>
                {comments}
            </div>
        </div>
    )
}
}