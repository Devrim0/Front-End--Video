import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileFollowings = () => {
  const { userName } = useParams<{ userName: string }>();
  const [followings, setFollowings] = useState<any[]>([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view followings.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/followers/follow/${userName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFollowings(data.followings);
        } else {
          alert('Failed to fetch followings');
        }
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };

    fetchFollowings();
  }, [userName]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Following by {userName}</h2>
      <ul>
        {followings.map(following => (
          <li key={following.username}>@{following.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileFollowings;
