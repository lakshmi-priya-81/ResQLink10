import React, { useState, useEffect } from 'react';

// AdminLoginForm component for handling admin login with validation and loading state
export function AdminLoginForm({ onLoginSuccess }) {
  // State for form inputs, error messages, login status, and countdown
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown for redirect after login

  // Clear localStorage on component mount to ensure fresh login
  useEffect(() => {
    localStorage.removeItem('adminLoggedIn');
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
      onLoginSuccess(); // Trigger parent state to show AdminDashboard
    }
  }, [isLoggedIn, countdown, onLoginSuccess]);

  // Handle form submission with basic validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for login
    setTimeout(() => {
      if (username && password) { // Accept any non-empty username and password
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        setError('');
      } else {
        setError('Please enter both username and password');
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setUsername('');
    setPassword('');
    setCountdown(5);
  };

  return (
    <div className="login-card">
      <h2>Admin Login</h2>
      <p className="login-description">
        Welcome, Admin! Use your credentials to securely manage organ and blood donor records.
      </p>
      {isLoggedIn ? (
        <div>
          <p>Welcome, Admin! You are logged in.</p>
          <p>Redirecting to dashboard in {countdown} seconds...</p>
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
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
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
    </div>
  );
}

// AdminDashboard component (unchanged)
export function AdminDashboard() {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRecipients, setTotalRecipients] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      setTimeout(() => {
        setTotalDonors(1500);
        setTotalRecipients(1200);
        setRecentActivity([
          { id: 1, action: 'New donor registered', timestamp: new Date().toISOString() },
          { id: 2, action: 'Organ match found', timestamp: new Date().toISOString() },
        ]);
        setLastRefreshed(new Date().toISOString());
        setIsLoadingStats(false);
      }, 1000);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDonors((prev) => prev + Math.floor(Math.random() * 10));
      setTotalRecipients((prev) => prev + Math.floor(Math.random() * 5));
      setRecentActivity((prev) => [
        ...prev,
        { id: prev.length + 1, action: 'Updated donor profile', timestamp: new Date().toISOString() },
      ].slice(-3));
      setLastRefreshed(new Date().toISOString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoadingStats) {
      console.log('Dashboard stats loaded:', { totalDonors, totalRecipients });
    }
  }, [isLoadingStats, totalDonors, totalRecipients]);

  return (
    <div className="dashboard-card">
      <h2>Admin Dashboard</h2>
      <p className="dashboard-description">
        Overview of donor and recipient activity.
      </p>
      {isLoadingStats ? (
        <p>Loading stats...</p>
      ) : (
        <div>
          <div className="stats">
            <h3>Total Donors: {totalDonors}</h3>
            <h3>Total Recipients: {totalRecipients}</h3>
          </div>
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
              {recentActivity.map((activity) => (
                <li key={activity.id}>
                  {activity.action} at {new Date(activity.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
          {lastRefreshed && (
            <p style={{ marginTop: '10px', color: '#555', fontSize: '14px' }}>
              Last refreshed: {new Date(lastRefreshed).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}