import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Vehicles from '../pages/manager/Vehicles';
import Reports from '../pages/manager/Reports';
import TripLogs from '../pages/driver/TripLogs';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';
import LocationUpdate from '../pages/driver/LocationUpdate';
import VehicleDetails from '../pages/manager/VehicleDetails';
const AppRoutes = () => {
  const { user, role } = useAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const RequireRole = ({ children, allowedRole }) => {
    return role === allowedRole ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Manager-only routes */}
      <Route
        path="/vehicles"
        element={
          <RequireAuth>
            <RequireRole allowedRole="manager">
              <Vehicles />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/reports"
        element={
          <RequireAuth>
            <RequireRole allowedRole="manager">
              <Reports />
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* Driver-only routes */}
      <Route
        path="/triplogs"
        element={
          <RequireAuth>
            <RequireRole allowedRole="driver">
              <TripLogs />
            </RequireRole>
          </RequireAuth>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
      <Route path="/update-location" element={<LocationUpdate />} />
      <Route path="/vehicle-details" element={<VehicleDetails />} />

    </Routes>
  );
};

export default AppRoutes;
