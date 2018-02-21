import React from 'react';
import {Map} from './Map';
import {Polyline} from "react-google-maps";
import {Route, Link} from 'react-router-dom';


export class WalkingRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            name:'',
            description:'',
            categoryId:'',
            markers:[],
            polylines:[],
            userId:''
          }
        this.categories = this.categories.bind(this)
        this.handleMarkers = this.handleMarkers.bind(this)
        this.changeCoordinatesOfMarker = this.changeCoordinatesOfMarker.bind(this)
        this.polyline = this.polyline.bind(this)
    };

    polyline(){
        this.setState({polylines:<Polyline path={this.state.markers}/>})
    }

    handleMarkers(lat,lng) {
        let markers = this.state.markers;
        markers.push({
            lat:lat,
            lng:lng
        })
        console.log(markers)
        this.setState({markers:markers})
        this.polyline()
    }

    changeCoordinatesOfMarker(index, lat, lng){
        let markers = this.state.markers;
        markers[index].lat = lat;
        markers[index].lng = lng;
        console.log('changedMarkers', markers);
        this.setState({markers:markers});
    }

    categories(){
        let url = 'http://localhost:3001/categories';
        let categories =[]
        fetch(url)
        .then(response=>response.json())
        .then(res=>{ 
            console.log('res',res)
            this.setState({categories:res})
        })
    }
    componentDidMount(){
        this.categories()
    }
    render() {
        let userName = JSON.parse(localStorage.getItem('user'));
        let userId = JSON.parse(localStorage.getItem('id'));
        let categories = this.state.categories.map((category,index)=>{
            return (<option key={index} value={category.id}>{category.name}</option>)
        })
        return (
            <div> 
                <ul style={{listStyleType: "none", display: "block"}} className='offset-9'>
                <li style={{float: "left", marginRight: "10px"}}>You login as: {userName}</li>
                <li><Link to='/' onClick={()=>localStorage.clear()}>&#x274c;</Link></li>
                </ul>

                <h1 className="text-center">Adding Route</h1>
                <div className="mx-auto mb-3 w-75">
                    <Map 
                        polylines={this.state.polylines}
                        markers={this.state.markers}
                        changeCoordinatesOfMarker = {this.changeCoordinatesOfMarker}
                        handleMarkers={this.handleMarkers}
                        containerElement={<div style={{height: '500px'}}/>} 
                        mapElement={<div style={{height: '500px'}}/>}
                    />
                </div>
                <div className="map-form text-center">
                    <h3>Route details</h3>
                    <input type="text" value={this.state.name} 
                    onChange={(e)=>this.setState({name:e.target.value})} placeholder="Route title"/>
                        <br/>
                    <h5>Route categories</h5>    
                    <select onChange={(e)=>this.setState({categoryId:e.target.value})}>
                        {categories}
                    </select>
                    <h5>Route description</h5>   
                    <input type="text" value={this.state.description} placeholder="Write some description"
                    onChange={(e)=>this.setState({description:e.target.value})} placeholder="Route title"/>
                        <br/>
                    <button onClick={()=>{
                 fetch("http://localhost:3001/routes",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            userId:userId,
                            name:this.state.name,
                            description:this.state.description,
                            categoryId:this.state.categoryId,
                            route:this.state.markers
                        })
                    });    
                    }}>Submit</button>
                </div>
            </div>
        );
    }
}