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

const Map = () => {

    return (
           <MapContainer className="h-[400px]" center={[39.925533, 32.866287]} zoom={13} scrollWheelZoom={false}>
               <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker  position={[39.925533, 32.866287]}>
                   <Popup>
                       Activity Address
                   </Popup>
               </Marker>
           </MapContainer>
    );
};

export default Map;
