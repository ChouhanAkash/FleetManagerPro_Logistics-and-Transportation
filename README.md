# FleetManagerPro_Logistics-and-Transportation

FleetManagerPro is an all-in-one fleet management system designed to help logistics companies track vehicles, monitor trip statuses, and manage drivers efficiently. It provides real-time location tracking using geocoding and Firebase integration.

---

## 🔧 Tech Stack

- **Frontend:** React, React Router, Leaflet.js (Map)
- **Backend/DB:** Firebase Firestore
- **Authentication:** Firebase Auth
- **APIs Used:** OpenStreetMap (Leaflet), OpenCage Geocoding API

---

## 📦 Features

- 🔒 Driver Authentication (Login / Sign-out)
- 🗺️ Live Location Tracking on Map (OpenStreetMap)
- 📍 Real-time location update by city name
- 📊 Trip list with vehicle, route, and driver info
- 📏 Remaining distance calculation using coordinates
- 🧭 Interactive map markers (Start, Current, Destination)
- 📁 Firebase Firestore for real-time trip data

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChouhanAkash/FleetManagerPro_Logistics-and-Transportation.git
   cd fleetmanagerpro

2. **Install dependencies**
```bash
npm install

3. **Setup Firebase**

Create a Firebase project

Enable Firestore and Authentication

Replace /src/firebase.js with your credentials

4. **Set up geocoding**

Use OpenCage API for geocoding cities in geocodeCity.js

5.**Start the development server**
npm run dev

##Folder Structure

src/
├── components/
├── pages/
│   ├── LocationUpdate.jsx
│   ├── Vehicles.jsx
│   └── VehicleDetails.jsx
├── firebase.js
├── utils/
│   └── geocodeCity.js
