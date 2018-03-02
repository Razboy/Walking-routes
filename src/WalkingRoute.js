import React from 'react';
import {Map} from './Map';
// import {Polyline} from "react-google-maps";
// import {Route, Link} from 'react-router-dom';
import Header from './header';

export default class WalkingRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            category: "",
            allCategories: [],
            name: "",
            description: "",
            markers: [],
            lenght: 123,
            polylines: []
          }
        this.verification = this.verification.bind(this)
        this.handleMarkers = this.handleMarkers.bind(this)
        this.changeCoordinatesOfMarker = this.changeCoordinatesOfMarker.bind(this)
    };

    componentDidMount() {
        fetch("http://localhost:3001/categories")
            .then(response => response.json())
            .then(data => {this.setState({allCategories: data})});
        };

    handleMarkers(lat,lng) {
        let markers = this.state.markers;
        markers.push({
            lat:lat,
            lng:lng
        })
        this.setState({markers:markers})
    }

    changeCoordinatesOfMarker(index, lat, lng) {
        let markers = this.state.markers;
        markers[index].lat = lat;
        markers[index].lng = lng;
        this.setState({markers:markers});
    }

    verification() {
        fetch("http://localhost:3001/routes",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name :this.state.name, 
                category: this.state.category, 
                markers: this.state.markers, 
                length: this.state.length, 
                description: this.state.description, 
                user: JSON.parse(localStorage.getItem('id'))})
        });
        alert('You have successfully created the route')
    }

    render() {
       return (
        <div>
        <Header/>
        <form className="container w-50 my-4" onSubmit={this.verification}>
            <div className="row m-3">
                <input type="text" placeholder="Route title" className="w-50 mx-auto" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
            </div>
            <div className="row m-3">
                <select className="w-50 mx-auto" value={this.state.category} onChange={(e)=>this.setState({category:e.target.value})}>
                    <option value="" disabled hidden>Select your category</option>
                    {this.state.allCategories.map((value, index) => {
                        return (
                            <option key={index} value={value.name}>{value.name}</option>
                        )
                    })
                    }
                </select>
            </div>
            <Map 
                markers={this.state.markers}
                handleMarkers={this.handleMarkers}
                changeCoordinatesOfMarker={this.changeCoordinatesOfMarker}
                containerElement={<div style={{height: '400px'}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
            <div className="row m-3">
                <textarea placeholder="Route Description" className="col" style={{height:200}} value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}/>
            </div>
            <div className="row m-3">
                <button type="submit" className="btn btn-primary px-2 col">Create route</button>
            </div>
      </form>
      </div>
       )
    }
}