import React, { useState, useEffect } from 'react';

function AvailabilitySearch() {
  // State for form inputs, search results, and loading status
  const [organType, setOrganType] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Effect to load saved search preferences from localStorage
  useEffect(() => {
    const savedOrganType = localStorage.getItem('lastOrganType');
    const savedLocation = localStorage.getItem('lastLocation');
    if (savedOrganType) setOrganType(savedOrganType);
    if (savedLocation) setLocation(savedLocation);
  }, []);

  // Effect to simulate fetching search results when form is submitted
  useEffect(() => {
    if (isSearching) {
      // Simulate API call
      const fetchResults = async () => {
        try {
          // Mock data for demonstration
          const mockResults = [
            { id: 1, type: organType, location, available: true, hospital: 'City Hospital' },
            { id: 2, type: organType, location, available: false, hospital: 'General Medical Center' },
          ];
          setTimeout(() => {
            setResults(mockResults);
            setIsSearching(false);
            localStorage.setItem('lastOrganType', organType);
            localStorage.setItem('lastLocation', location);
          }, 1000); // Simulate network delay
        } catch (err) {
          setError('Failed to fetch results. Please try again.');
          setIsSearching(false);
        }
      };
      fetchResults();
    }
  }, [isSearching, organType, location]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!organType || !location) {
      setError('Please select an organ type and enter a location.');
      return;
    }
    setError('');
    setIsSearching(true);
  };

  return (
    <div className="content-container">
      <h2>Check Organ / Blood Availability</h2>
      <p className="login-description">
        Check real-time availability of organs or blood in your region.
      </p>
      <form onSubmit={handleSubmit}>
        <select
          value={organType}
          onChange={(e) => setOrganType(e.target.value)}
          required
        >
          <option value="">Select Organ/Blood Type</option>
          <option>Heart</option>
          <option>Kidney</option>
          <option>Liver</option>
          <option>Blood</option>
        </select>
        <input
          type="text"
          placeholder="Enter City or State"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        <button type="submit" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Search Results</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((result) => (
              <li key={result.id} style={{ margin: '10px 0', color: result.available ? 'green' : 'red' }}>
                {result.type} at {result.hospital}, {result.location}: {result.available ? 'Available' : 'Not Available'}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="register-link">
        <p>New to the platform? <a href="/register">Register as a Donor or Recipient</a></p>
      </div>
    </div>
  );
}

export default AvailabilitySearch;