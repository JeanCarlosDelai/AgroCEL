import React, { useEffect, useState } from 'react';

function MapInput({ onLocationChange }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjTEOgTpD9c7eEpZY0a29qI3MLVMuZTeU&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 10,
    });

    map.addListener('click', (event) => {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(location);
      onLocationChange(location);
    });
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {selectedLocation && (
        <div>
          Latitude: {selectedLocation.lat}
          <br />
          Longitude: {selectedLocation.lng}
        </div>
      )}
    </div>
  );
}

export default MapInput;
