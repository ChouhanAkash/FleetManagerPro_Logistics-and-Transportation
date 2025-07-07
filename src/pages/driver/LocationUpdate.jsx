// src/pages/LocationUpdate.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  updateDoc
} from 'firebase/firestore';
import { geocodeCity } from '../../utils/geocodeCity';
import './LocationUpdate.css';

const LocationUpdate = () => {
  const { user } = useAuth();
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateLocation = async () => {
    if (!city) {
      setMessage('Please enter your current city.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      console.log('📍 Updating location for city:', city);
      const currentCoord = await geocodeCity(city);
      console.log('📍 Geocoded Coordinates:', currentCoord);

      const q = query(
        collection(db, 'tripLogs'),
        where('driverEmail', '==', user?.email),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      console.log('🔍 Querying trips for email:', user?.email);
      const querySnapshot = await getDocs(q);
      console.log('📝 Query Snapshot:', querySnapshot.empty ? 'No results' : 'Trip found');

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        console.log('📄 Trip Document ID:', docRef.id);

        await updateDoc(docRef, {
          currentCoord,
          lastUpdated: new Date(),
        });

        console.log('✅ Location updated in Firestore');
        setMessage('Location updated successfully!');
      } else {
        console.warn('⚠️ No active trip found for this driver');
        setMessage('No active trip found for this driver.');
      }
    } catch (err) {
      console.error('❌ Error in location update:', err);
      setMessage('Error updating location. Try again.');
    }

    setLoading(false);
    setCity('');
  };

  return (
    <div className="location-update-container">
      <h2>Update Current Location</h2>
      <input
        type="text"
        placeholder="Enter current city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleUpdateLocation} disabled={loading}>
        {loading ? 'Updating...' : 'Update Location'}
      </button>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default LocationUpdate;
