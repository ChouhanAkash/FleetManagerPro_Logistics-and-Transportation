// src/pages/TripLogs.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { geocodeCity } from '../../utils/geocodecity';
import { db } from '../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import './trip.css';

const TripLogs = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    phone: '',
    fromCity: '',
    toCity: '',
    vehicleNo: '',
    kilometers: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fromCoord = await geocodeCity(form.fromCity);
      const toCoord = await geocodeCity(form.toCity);

      await addDoc(collection(db, 'tripLogs'), {
        ...form,
        driverEmail: user?.email, // 🔑 Used for location update match
        fromCoord,
        toCoord,
        currentCoord: fromCoord, // default to starting point
        status: 'On Route',
        timestamp: Timestamp.now(),
      });

      setMessage('Trip successfully logged!');
      setForm({
        phone: '',
        fromCity: '',
        toCity: '',
        vehicleNo: '',
        kilometers: '',
      });
    } catch (err) {
      console.error(err.message);
      setMessage('Failed to log trip.');
    }
    setLoading(false);
  };

  return (
    <div className="trip-form-container">
      <h2>Log New Trip</h2>
      <input name="phone" placeholder="Driver Phone" value={form.phone} onChange={handleChange} />
      <input name="fromCity" placeholder="From City" value={form.fromCity} onChange={handleChange} />
      <input name="toCity" placeholder="To City" value={form.toCity} onChange={handleChange} />
      <input name="vehicleNo" placeholder="Vehicle Number" value={form.vehicleNo} onChange={handleChange} />
      <input name="kilometers" placeholder="Estimated Kilometers" value={form.kilometers} onChange={handleChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Logging...' : 'Submit Trip'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TripLogs;
