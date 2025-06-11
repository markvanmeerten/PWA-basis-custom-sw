import React, { useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";

const Location = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocatie wordt niet ondersteund door deze browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError("Fout bij ophalen van locatie: " + err.message);
      }
    );
  }, []);

  return (
    <>
      <p>Bekijk hier je huidige GPS locatie</p>
      
        {error && (
            <p style={{ color: "red" }}>
                {error}
            </p>
        )}

        {!coordinates && !error && (
            <p>Locatie wordt opgehaald...</p>
        )}

        {coordinates && (
            <GoogleMap coordinates={coordinates}></GoogleMap>
        )}
    </>
  );
};

export default Location;
