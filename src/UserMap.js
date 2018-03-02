import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline,DirectionsRenderer} from "react-google-maps";

export const UserMap = withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat:49.4436409, lng:32.05685149}}
        >
            {props.markers.map((value,i)=>(
                <Marker
                    key={i}
                    position={value}
                />
            ))}
            <Polyline
                path={props.markers}
            />
            <DirectionsRenderer
                directions={props.markers}
            />
        </GoogleMap>
    )
});