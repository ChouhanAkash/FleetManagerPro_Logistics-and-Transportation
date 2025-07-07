
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter basename="/FleetManagerPro_Logistics-and-Transportation">
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
