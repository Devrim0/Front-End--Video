import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistCard from "../../components/playlist-card";

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const ProfileHome = () => {
  const { userId } = useParams<{ userId: string }>(); // useParams ile userId'yi alıyoruz
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (userId) {
      fetchLikedVideos();
    }
  }, [userId]);

  const fetchLikedVideos = async () => {
    try {
      const response = await fetch(`http://localhost:5353/api/users/${userId}/liked-videos`);
      if (!response.ok) {
        throw new Error("Failed to fetch liked videos");
      }
      const data = await response.json();
      setLikedVideos(data);
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  };

  return (
    <div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">Last Videos</h2>
        <div className="grid grid-cols-4 gap-5 mt-3">
          {likedVideos.map((video) => (
            <div key={video.id} className="video-card">
              <img src={video.thumbnail} alt={video.title} className="w-full h-auto" />
              <h3 className="text-sm font-semibold mt-2">{video.title}</h3>
              <p className="text-xs">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
