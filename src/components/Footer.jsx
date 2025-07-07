// src/components/Footer.jsx
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>FleetManagerPro</h3>
          <p>
            Your all-in-one platform to manage fleets, drivers, maintenance, and analytics — making logistics efficient and reliable.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/vehicles">Vehicles</a></li>
            <li><a href="/triplogs">Trip Logs</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><i className="fas fa-envelope"></i> support@fleetmanagerpro.com</p>
          <p><i className="fas fa-phone"></i> +91 98765 43210</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FleetManagerPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
