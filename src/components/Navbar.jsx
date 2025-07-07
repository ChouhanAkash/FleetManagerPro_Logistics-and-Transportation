import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, role } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (role === undefined) return null; // Wait for role to load

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">FleetManagerPro</h1>

        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'active-link' : 'unactive')}
            >
              Home
            </NavLink>
          </li>

          {role === 'manager' && (
            <li>
              <NavLink
                to="/vehicles"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'active-link' : 'unactive')}
              >
                Vehicles
              </NavLink>
            </li>
          )}

          {role === 'driver' && (
            <>
              <li>
                <NavLink
                  to="/triplogs"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active-link' : 'unactive')}
                >
                  Trips
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/update-location"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active-link' : 'unactive')}
                >
                  Update Location
                </NavLink>
              </li>
            </>
          )}

          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Sign out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
