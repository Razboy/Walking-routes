import React from 'react';
import {Map} from './Map';
import {Polyline} from "react-google-maps";
import {Route, Link} from 'react-router-dom';
import ReactStar from 'react-rating';

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            routes:[],
            id:0,
            MapId:0,
            description:'',
            rating:0
        }
    this.users = this.users.bind(this)
    this.routes = this.routes.bind(this)
    };

    users(){
        let url = 'http://localhost:3001/users';
        let users = []
        fetch(url)
        .then(response=>response.json())
        .then(res=>{ 
            console.log('res',res)
            this.setState({users:res})
          })
        }
    
    routes(){
        let url = 'http://localhost:3001/routes';
        let routes = []
        fetch(url)
        .then(response=>response.json())
        .then(res=>{ 
            console.log('res',res)
            this.setState({routes:res})
          })
        }

    componentDidMount() {
        this.users(),
        this.routes()
    }

render() {
    let userName = JSON.parse(localStorage.getItem('user'));

    let userId = localStorage.getItem('id');
    
    let users = this.state.users.map((users,index)=>{
        return (<li style={{cursor: 'pointer'}} key={index} value={users.id}
        onClick={(e)=>this.setState({id:e.target.value})}
        >{users.email}</li>)
    })

    let routesList = this.state.routes.map((value,index)=> {
        if(this.state.id === value.userId){
        return(
            <li style={{cursor: 'pointer'}} key={index} value={value.id}
            onClick={(e)=>this.setState({MapId:e.target.value})}
            >{value.name}</li>)
        } else return(null)
    })

    let userdate = this.state.routes.map((value, i)=>{
        if(this.state.MapId == value.id ){
           return(
               <div key={i}>
               <Map 
                   markers={value.route}
                   containerElement={<div style={{height: '700px', width:'900px', margin:'0 auto'}}/>}
                   mapElement={<div style={{height: '700px'}}/>}
               />

                   <div className="text-center">
                           <h5>CategoryId: {value.categoryId}</h5><br/>
                           <h5>Name: {value.name}</h5><br/>
                           <h5>Description: {value.description}</h5>
                    </div>
                   <div className='text-center'>
                       <h3>Comment</h3>
                       <textarea onChange={(e)=>this.setState({description:e.target.value})} > </textarea><br/>
                       <span></span>
                       <ReactStar {...this.props} initialRating={this.state.rating} onChange={(e)=>this.setState({rating:e})} /><br/>
                       <button onClick={()=>{
                           fetch("http://localhost:3001/comments",
                               {
                                   headers: {
                                       'Accept': 'application/json',
                                       'Content-Type': 'application/json'
                                   },
                                   method: "POST",
                                   body: JSON.stringify({
                                       UserId:value.userId,
                                       rating:this.state.rating,
                                       description:this.state.description
                                   })
                               });
                       }}>add comments</button>
                   </div>
               </div>
           )}
    });

    return(
        <div>
            <ul style={{listStyleType: "none", display: "block"}} className='offset-9'>
                <li style={{float: "left", marginRight: "10px"}}>You login as: {userName}</li>
                <li><Link to='/' onClick={()=>localStorage.clear()}>&#x274c;</Link></li>
            </ul>

            <h3 className="text-center">Registered Users</h3>
            <h5 className="text-center">(Click on user to show routes)</h5>
            <ul>
                {users}
            </ul>
                <br/>
            <ul>
                {routesList}
            </ul>    
            <ul className="text-center">
                {userdate}
            </ul>    
        </div>
    )
}
}