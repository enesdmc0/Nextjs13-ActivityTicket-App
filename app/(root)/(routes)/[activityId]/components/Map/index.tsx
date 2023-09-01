"use client"
import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import L from "leaflet";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
});

interface Props {
    latitude: string
    longitude: string
}

const Map: React.FC<Props> = ({latitude, longitude}) => {


    return (
           <MapContainer className="h-[400px]" center={[parseFloat(latitude), parseFloat(longitude)]} zoom={13} scrollWheelZoom={false}>
               <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker  position={[parseFloat(latitude), parseFloat(longitude)]}>
                   <Popup>
                       Activity Address
                   </Popup>
               </Marker>
           </MapContainer>
    );
};

export default Map;
