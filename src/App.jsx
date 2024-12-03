import React, { useState } from 'react';
import './App.css';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchData = async () => {
    if (!inputValue) return; 

    setLoading(true);
    setError('');
    
    try {
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${inputValue}`);
      const result = await response.json();
      
      if (response.ok) {
        setData(result);
      } else {
        setError('Data not found');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Details</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter User ID (1-10)"
      />
      <button onClick={handleFetchData}>Fetch Data</button>

      {loading && <p></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>User Info:</h2>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Website:</strong> {data.website}</p>
        </div>
      )}
    </div>
  );
}

export default App;
