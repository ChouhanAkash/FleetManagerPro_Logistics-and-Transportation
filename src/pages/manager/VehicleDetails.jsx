import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./VehicleDetails.css";

const VehicleDetails = () => {
  const { state } = useLocation();
  const { trip } = state || {};
  const [distanceKm, setDistanceKm] = useState(null);

  useEffect(() => {
    if (trip?.currentCoord && trip?.toCoord) {
      const dist = calculateDistance(trip.currentCoord, trip.toCoord);
      setDistanceKm(dist.toFixed(2));
    }
  }, [trip]);

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

  const iconStart = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    iconSize: [35, 35],
  });

  const iconDestination = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    iconSize: [35, 35],
  });

  if (!trip) return <div className="error-msg">❌ No trip selected</div>;

  return (
    <div className="vehicle-details-container">
      <h2 style={{ color: "#0077cc" }}>Vehicle Tracking</h2>
      <p><strong>Driver:</strong> {trip.driverName}</p>
      <p><strong>From:</strong> {trip.fromCity}</p>
      <p><strong>To:</strong> {trip.toCity}</p>
      <p><strong>Phone:</strong> {trip.phone}</p>
      <p><strong>Kilometers:</strong> {trip.kilometers} km</p>
      <p><strong>Status:</strong> {trip.status}</p>
      {distanceKm && (
        <p><strong>Remaining Distance:</strong> {distanceKm} km</p>
      )}

      {(trip.fromCoord && trip.toCoord) && (
        <MapContainer
          center={[
            trip.currentCoord?.lat || trip.fromCoord.lat,
            trip.currentCoord?.lng || trip.fromCoord.lng,
          ]}
          zoom={6}
          scrollWheelZoom={true}
          className="map-box"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Start Location */}
          <Marker position={[trip.fromCoord.lat, trip.fromCoord.lng]} icon={iconStart}>
            <Popup>🟢 Start: {trip.fromCity}</Popup>
          </Marker>

          {/* Current Location */}
          {trip.currentCoord && (
            <>
              <CircleMarker
                center={[trip.currentCoord.lat, trip.currentCoord.lng]}
                pathOptions={{ color: "red", fillColor: "#f03", fillOpacity: 0.5 }}
                radius={10}
              />
              <Popup position={[trip.currentCoord.lat, trip.currentCoord.lng]}>
                📍 Current Location
              </Popup>
            </>
          )}

          {/* Destination */}
          <Marker position={[trip.toCoord.lat, trip.toCoord.lng]} icon={iconDestination}>
            <Popup>🏁 Destination: {trip.toCity}</Popup>
          </Marker>

          {/* Route line */}
          <Polyline
            positions={[
              [trip.fromCoord.lat, trip.fromCoord.lng],
              trip.currentCoord
                ? [trip.currentCoord.lat, trip.currentCoord.lng]
                : [trip.fromCoord.lat, trip.fromCoord.lng],
              [trip.toCoord.lat, trip.toCoord.lng],
            ]}
            color="blue"
          />
        </MapContainer>
      )}
    </div>
  );
};

export default VehicleDetails;

{/**import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './VehicleDetails.css';

const VehicleDetails = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const tripSnap = await getDocs(collection(db, 'tripLogs'));
      const data = tripSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(data);
    };
    fetchTrips();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [25, 25],
  });

  return (
    <div className="vehicle-details-container">
      <h2>All Vehicle Trips</h2>
      {trips.map(trip => (
        <div className="vehicle-card" key={trip.id}>
          <h3>{trip.vehicleNo} - {trip.driverName}</h3>
          <p><strong>From:</strong> {trip.fromCity}</p>
          <p><strong>To:</strong> {trip.toCity}</p>
          <p><strong>Phone:</strong> {trip.phone}</p>
          <p><strong>Kilometers:</strong> {trip.kilometers} km</p>
          <p><strong>Status:</strong> {trip.status}</p>

          <MapContainer 
            center={[trip.fromCoord.lat, trip.fromCoord.lng]} 
            zoom={6} 
            scrollWheelZoom={false} 
            style={{ height: '300px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[trip.fromCoord.lat, trip.fromCoord.lng]} icon={customIcon}>
              <Popup>Start: {trip.fromCity}</Popup>
            </Marker>
            <Marker position={[trip.toCoord.lat, trip.toCoord.lng]} icon={customIcon}>
              <Popup>Destination: {trip.toCity}</Popup>
            </Marker>
            <Polyline
              positions={[[trip.fromCoord.lat, trip.fromCoord.lng], [trip.toCoord.lat, trip.toCoord.lng]]}
              color="blue"
            />
          </MapContainer>
        </div>
      ))}
    </div>
  );
};

export default VehicleDetails;
 */}
