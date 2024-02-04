// GitHubUser.js
import React, { useState } from 'react';

const GitHubUser = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError('User not found');
    }
  };

  return (
    <div>
      <h1>GitHub User Info</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Data</button>

      {userData && (
        <div>
           <h2>{userData.login}</h2>
          <img src={userData.avatar_url} alt={`${userData.login}'s Avatar`} style={{ maxWidth: '100px' }} />
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <p>Repositories: {userData.public_repos}</p>
          <p>Joined GitHub on: {new Date(userData.created_at).toDateString()}</p>
          
          {/* Add more details as needed */}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GitHubUser;
