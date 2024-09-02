import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileFollowers = () => {
  const { userName } = useParams<{ userName: string }>();
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view followers.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/followers/followers/${userName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFollowers(data.followers);
        } else {
          alert('Failed to fetch followers');
        }
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [userName]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Followers of {userName}</h2>
      <ul>
        {followers.map(follower => (
          <li key={follower.username}>@{follower.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileFollowers;
