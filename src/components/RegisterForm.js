import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function RegisterForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    donationTypes: { blood: false, organs: false },
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // 👇 New state for viewing saved response
  const [showResponse, setShowResponse] = useState(false);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    localStorage.removeItem('registerFormData');
    localStorage.removeItem('isRegistered');
  }, []);

  useEffect(() => {
    if (isRegistered && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isRegistered && countdown === 0) {
      onRegisterSuccess(formData);
    }
  }, [isRegistered, countdown, onRegisterSuccess, formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      donationTypes: { ...prev.donationTypes, [id]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.fullname || !formData.email || !formData.phone || !formData.location) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.donationTypes.blood && !formData.donationTypes.organs) {
      setError('Please select at least one donation type.');
      setIsSubmitting(false);
      return;
    }

    try {
      const timestamp = Timestamp.now();
      const docData = {
        ...formData,
        submittedAt: timestamp,
      };

      await addDoc(collection(db, 'donors'), docData);

      setIsRegistered(true);
      setError('');
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registerFormData', JSON.stringify(formData));
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullname: '',
      email: '',
      phone: '',
      location: '',
      donationTypes: { blood: false, organs: false },
    });
    setIsRegistered(false);
    setCountdown(5);
    setShowResponse(false);
    localStorage.removeItem('registerFormData');
    localStorage.removeItem('isRegistered');
  };

  // 👇 View Response Handler
  const handleViewResponse = () => {
    const data = localStorage.getItem('registerFormData');
    if (data) {
      setSavedData(JSON.parse(data));
      setShowResponse(true);
    } else {
      alert("No response found.");
    }
  };

  return (
    <div className="register-form">
      <h2>Donor Registration</h2>
      <p className="login-description">
        Join our community of life savers by registering as a donor.
      </p>

      {isRegistered ? (
        <div>
          <p>Registration successful! Welcome to the Organ Donor Portal.</p>
          <p>Redirecting to confirmation in {countdown} seconds...</p>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#b71c1c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#d32f2f')}
          >
            Register Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input id="fullname" type="text" value={formData.fullname} onChange={handleInputChange} required />

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" value={formData.email} onChange={handleInputChange} required />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />

          <label htmlFor="location">Location (City, State)</label>
          <input id="location" type="text" value={formData.location} onChange={handleInputChange} required />

          <label>Select Donation Type:</label>
          <div className="checkbox-container">
            <input type="checkbox" id="blood" checked={formData.donationTypes.blood} onChange={handleCheckboxChange} />
            <label htmlFor="blood">Blood</label>
            <input type="checkbox" id="organs" checked={formData.donationTypes.organs} onChange={handleCheckboxChange} />
            <label htmlFor="organs">Organs</label>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}

      <button
        type="button"
        style={{
          marginTop: "12px",
          padding: "10px",
          backgroundColor: "#1565c0",
          color: "white",
          fontWeight: "bold",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
        onClick={handleViewResponse}
      >
        View Your Response
      </button>

      {showResponse && savedData && (
        <div style={{
          marginTop: "20px",
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "left"
        }}>
          <h3>Your Submitted Details:</h3>
          <p><strong>Name:</strong> {savedData.fullname}</p>
          <p><strong>Email:</strong> {savedData.email}</p>
          <p><strong>Phone:</strong> {savedData.phone}</p>
          <p><strong>Location:</strong> {savedData.location}</p>
          <p><strong>Donation Types:</strong>
            {savedData.donationTypes.blood && ' Blood'}
            {savedData.donationTypes.organs && ' Organs'}
          </p>
        </div>
      )}

      <p className="note">
        <strong>Note:</strong> All your details are kept confidential and used only for donor matching purposes.
      </p>
    </div>
  );
}

export function DonorConfirmation({ donorData }) {
  const [confirmationMessage, setConfirmationMessage] = useState('Thank you for registering!');
  const [registrationTime, setRegistrationTime] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    setRegistrationTime(new Date().toISOString());
  }, []);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setConfirmationMessage('Your registration details have been saved.');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = '/dashboard';
    }
  }, [countdown]);

  return (
    <div className="confirmation-form">
      <h2>Registration Confirmation</h2>
      <p className="confirmation-description">{confirmationMessage}</p>
      {showWelcome && <p className="welcome-message">Welcome to the Organ Donor Portal!</p>}
      <div className="donor-details">
        <h3>Your Details:</h3>
        <p><strong>Name:</strong> {donorData.fullname}</p>
        <p><strong>Email:</strong> {donorData.email}</p>
        <p><strong>Phone:</strong> {donorData.phone}</p>
        <p><strong>Location:</strong> {donorData.location}</p>
        <p><strong>Donation Types:</strong> 
          {donorData.donationTypes.blood && ' Blood'}
          {donorData.donationTypes.organs && ' Organs'}
          {!donorData.donationTypes.blood && !donorData.donationTypes.organs && ' None'}
        </p>
      </div>
      {registrationTime && (
        <p style={{ marginTop: '10px', color: '#555', fontSize: '14px' }}>
          Registered at: {new Date(registrationTime).toLocaleString()}
        </p>
      )}
      <p>Redirecting to dashboard in {countdown} seconds...</p>
      <button
        onClick={() => (window.location.href = '/dashboard')}
        style={{
          backgroundColor: '#2e7d32',
          color: 'white',
          padding: '12px',
          fontSize: '15px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#1b5e20')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#2e7d32')}
      >
        Go to Dashboard Now
      </button>
    </div>
  );
}
