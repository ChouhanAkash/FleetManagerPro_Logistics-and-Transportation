// File: src/pages/Vehicles.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tripLogs'), async (snapshot) => {
      const trips = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const updatedTrips = await Promise.all(
        trips.map(async (trip) => {
          let remainingKm = null;

          if (trip.currentCoord && trip.toCoord) {
            remainingKm = calculateDistance(trip.currentCoord, trip.toCoord);
            
            // Auto-update to "Arrived" if very close
            if (remainingKm < 1 && trip.status !== 'Arrived') {
              const docRef = doc(db, 'tripLogs', trip.id);
              await updateDoc(docRef, { status: 'Arrived' });
              trip.status = 'Arrived';
            }
          }

          return { ...trip, remainingKm: remainingKm?.toFixed(2) };
        })
      );

      setVehicles(updatedTrips);
    });

    return () => unsub();
  }, []);

  const calculateDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getStatusClass = (status) => {
    return status === 'Arrived' ? 'status arrived' : 'status onroute';
  };

  return (
    <div className="vehicles-container">
      <h2>Vehicle Tracker</h2>
      <div className="vehicle-list">
        {vehicles.map((trip) => (
          <div key={trip.id} className="vehicle-card">
            <h3>{trip.vehicleNo}</h3>
            <p className={getStatusClass(trip.status)}>
              <strong>Status:</strong> {trip.status}
            </p>
            <p><strong>Driver:</strong> {trip.driverName} ({trip.phone})</p>
            <p><strong>From:</strong> {trip.fromCity}</p>
            <p><strong>To:</strong> {trip.toCity}</p>
            <p><strong>Kilometers:</strong> {trip.kilometers} km</p>
            {trip.remainingKm && (
              <p><strong>Remaining Distance:</strong> {trip.remainingKm} km</p>
            )}
            <button
              onClick={() => navigate('/vehicle-details', { state: { trip } })}
              className="track-btn"
            >
              Track Vehicle
            </button>
            <div className="map-wrapper">
              <MapContainer
                center={[
                  trip.currentCoord?.lat || trip.fromCoord.lat,
                  trip.currentCoord?.lng || trip.fromCoord.lng,
                ]}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: '200px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {trip.fromCoord && (
                  <Marker
                    position={[trip.fromCoord.lat, trip.fromCoord.lng]}
                    icon={L.icon({
                      iconUrl:
                        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    })}
                  >
                    <Popup>Start: {trip.fromCity}</Popup>
                  </Marker>
                )}
                {trip.toCoord && (
                  <Marker
                    position={[trip.toCoord.lat, trip.toCoord.lng]}
                    icon={L.icon({
                      iconUrl:
                        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    })}
                  >
                    <Popup>Destination: {trip.toCity}</Popup>
                  </Marker>
                )}
                {trip.currentCoord && (
                  <Marker
                    position={[trip.currentCoord.lat, trip.currentCoord.lng]}
                    icon={L.icon({
                      iconUrl:
                        'https://cdn-icons-png.flaticon.com/512/61/61168.png',
                      iconSize: [30, 30],
                    })}
                  >
                    <Popup>Current Location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
