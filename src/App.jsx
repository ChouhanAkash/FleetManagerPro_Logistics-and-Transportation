
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer/>
      </AuthProvider>
    </div>
  )
    
};

export default App;
