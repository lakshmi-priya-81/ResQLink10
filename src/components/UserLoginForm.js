import React, { useState, useEffect } from 'react';

// UserLoginForm component for handling user login with validation and session management
export function UserLoginForm({ onLoginSuccess }) {
  // State for form inputs, error messages, login status, and redirect countdown
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown for redirect after login

  // Clear localStorage on component mount to ensure fresh login
  useEffect(() => {
    localStorage.removeItem('userLoggedIn');
  }, []);

  // Effect: Clear error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [error]);

  // Effect: Handle countdown for redirect after successful login
  useEffect(() => {
    if (isLoggedIn && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLoggedIn && countdown === 0) {
      onLoginSuccess(); // Trigger parent state to show DonorProfile
    }
  }, [isLoggedIn, countdown, onLoginSuccess]);

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for login
    setTimeout(() => {
      if (email && password) { // Accept any non-empty email and password
        setIsLoggedIn(true);
        localStorage.setItem('userLoggedIn', 'true');
        setError('');
      } else {
        setError('Please enter both email and password');
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userLoggedIn');
    setEmail('');
    setPassword('');
    setCountdown(5);
  };

  return (
    <div className="login-card">
      <img
        src="https://www.sakraworldhospital.com/assets/spl_splimgs/organ-donation-2020-1.webp"
        alt="Organ Donation Banner"
        className="login-logo"
      />
      <h2>User Login</h2>
      <p className="login-description">
        Sign in to manage your donor profile, check organ availability, and update your health records.
      </p>
      {isLoggedIn ? (
        <div>
          <p>Welcome back! You are logged in.</p>
          <p>Redirecting to your profile in {countdown} seconds...</p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#b71c1c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#d32f2f')}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
      <p className="register-link">
        Not registered yet? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

// DonorProfile component (unchanged)
export function DonorProfile() {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [organPledge, setOrganPledge] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('donorProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name || '');
      setBloodType(profile.bloodType || '');
      setOrganPledge(profile.organPledge || '');
      setLastUpdated(profile.lastUpdated || null);
    }
  }, []);

  useEffect(() => {
    if (name || bloodType || organPledge) {
      const profile = { name, bloodType, organPledge, lastUpdated: new Date().toISOString() };
      localStorage.setItem('donorProfile', JSON.stringify(profile));
      setLastUpdated(profile.lastUpdated);
    }
  }, [name, bloodType, organPledge]);

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
  };

  return (
    <div className="profile-card">
      <h2>Donor Profile</h2>
      <p className="profile-description">
        Update your donor information to help us match you with recipients.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          required
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <select
          value={organPledge}
          onChange={(e) => setOrganPledge(e.target.value)}
          required
        >
          <option value="">Select Organ to Pledge</option>
          <option value="Heart">Heart</option>
          <option value="Kidney">Kidney</option>
          <option value="Liver">Liver</option>
          <option value="Lungs">Lungs</option>
        </select>
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {lastUpdated && (
        <p style={{ marginTop: '10px', color: '#555', fontSize: '14px' }}>
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      )}
      {isUpdating && (
        <p style={{ color: 'green', fontSize: '14px' }}>
          Profile updated successfully!
        </p>
      )}
    </div>
  );
}