import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"

const GoogleMap = ({ coordinates }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [position, setPosition] = useState();

  useEffect(() => {
    console.log(apiKey);
    
    setPosition({ lat: coordinates.latitude, lng: coordinates.longitude });
  }, [coordinates, apiKey])
  
  return (
    <>
    <div style={{ height: '200px' }}>
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={position} defaultZoom={16} mapId="DEMO_MAP_ID" disableDefaultUI>
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
    </>
  )
};

export default GoogleMap;
