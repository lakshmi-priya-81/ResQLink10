import React, { useState, useEffect } from 'react';

// RegisterForm component for handling donor registration with validation and persistence
export function RegisterForm({ onRegisterSuccess }) {
  // State for form inputs, error messages, and submission status
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
  const [countdown, setCountdown] = useState(5); // Countdown for redirect after registration

  // Clear localStorage on component mount to ensure fresh registration
  useEffect(() => {
    localStorage.removeItem('registerFormData');
    localStorage.removeItem('isRegistered');
  }, []);

  // Effect: Handle countdown for redirect after successful registration
  useEffect(() => {
    if (isRegistered && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRegistered && countdown === 0) {
      onRegisterSuccess(formData); // Trigger parent state to show DonorConfirmation
    }
  }, [isRegistered, countdown, onRegisterSuccess, formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      donationTypes: { ...prev.donationTypes, [id]: checked },
    }));
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
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

    // Simulate API call
    setTimeout(() => {
      setIsRegistered(true);
      setError('');
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registerFormData', JSON.stringify(formData));
      setIsSubmitting(false);
    }, 1000); // Simulate network delay
  };

  // Reset form
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
    localStorage.removeItem('registerFormData');
    localStorage.removeItem('isRegistered');
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
          <input
            id="fullname"
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="location">Location (City, State)</label>
          <input
            id="location"
            type="text"
            placeholder="Location (City, State)"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <label>Select Donation Type:</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="blood"
              name="donationType"
              checked={formData.donationTypes.blood}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="blood">Blood</label>

            <input
              type="checkbox"
              id="organs"
              name="donationType"
              checked={formData.donationTypes.organs}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="organs">Organs</label>
          </div>

          {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      <p className="note">
        <strong>Note:</strong> All your details are kept confidential and used only for donor matching purposes.
      </p>
    </div>
  );
}

// DonorConfirmation component (unchanged)
export function DonorConfirmation({ donorData }) {
  const [confirmationMessage, setConfirmationMessage] = useState('Thank you for registering!');
  const [registrationTime, setRegistrationTime] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [countdown, setCountdown] = useState(10); // Countdown for redirect to dashboard

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
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = '/dashboard';
    }
  }, [countdown]);

  return (
    <div className="confirmation-form">
      <h2>Registration Confirmation</h2>
      <p className="confirmation-description">
        {confirmationMessage}
      </p>
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