import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordFixed.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) return alert("Please enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset}>Send Reset Email</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
