// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Register.css";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("driver");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password, role);
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="driver">Driver</option>
        <option value="manager">Manager</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
