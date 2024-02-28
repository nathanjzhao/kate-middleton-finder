import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [info, setInfo] = useState('');

  const [locationFetched, setLocationFetched] = useState(false);

  const createLocation = useMutation(api.locations.createLocation);
  const locations = useQuery(api.locations.getLocations);

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  const saveLocation = async () => {

    const savedLocationsCount = Cookies.get('savedLocationsCount') || 0;

    if (savedLocationsCount < 3) {
      await createLocation({
        position:  position, 
        handle: handle,
        name: name,
        info: info, 
      })

      setSavedLocations((locations) => [...locations, { position, handle, name, info }]);
      setHandle('');
      setName('');
      setInfo('');

      Cookies.set('savedLocationsCount', Number(savedLocationsCount) + 1);
    } else {
      alert('Just to make it funner for everyone, you can only save 3 locations!');
    }
  };

  useEffect(() => {
    if (locations && !locationFetched) {
      setSavedLocations(locations);
      setLocationFetched(true);
    }
  }, [locations]);

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>
            <div className="flex flex-col">
              <div className="relative">
                <input
                  className="mb-2 p-2 pl-6 border-2 border-gray-300 rounded-md"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Your twitter handle"
                />
                <div className="absolute left-2 top-2 bottom-2 text-gray-400">@</div>
              </div>
              <input
                className="mb-2 p-2 border-2 border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="The location name"
              />
              <textarea
                className="mb-2 p-2 border-2 border-gray-300 rounded-md resize-y"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Information about the location"
              />
              <button 
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={saveLocation}
              >
                Save Location
              </button>
            </div>
          </Popup>
        </Marker>
      )}
      {savedLocations.map((loc, idx) => (
        <Marker key={idx} position={loc.position}>
          <Popup>
            <div className="-py-4">
              <p className="font-bold">@{loc.handle}'s {loc.name}</p>
              <p className="text-gray-600">{loc.info}</p>

              <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  const tweet = `@${loc.handle} found Kate Middleton here: ${loc.name}. \n \nFind it here: https://kate-middleton-finder.vercel.app/?x=${loc.position.lat}&y=${loc.position.lng}`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
                  window.open(url, '_blank');
                }}
              >
                Share on Twitter
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const MapComponent = ({startX, startY}) => {
  return (
    <>
      <MapContainer center={[startX, startY]} zoom={(startX && startY) ? 11 : 2} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default MapComponent;