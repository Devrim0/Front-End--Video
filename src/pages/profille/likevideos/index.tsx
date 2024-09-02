import React, { useEffect, useState } from 'react';
import VideoCard from '../../components/video-card';

interface Video {
  id: number;
  title: string;
  description: string;
  views: number;
  uploadDate: string;
  thumbnail: string;
  url: string;
}

interface LikedVideosProps {
  userId: string;
  accessToken: string;
}

const LikedVideos: React.FC<LikedVideosProps> = ({ userId, accessToken}) => {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Mock data to simulate liked videos
    const mockLikedVideos: Video[] = [
      {
        id: 1,
        title: 'Sample Video 1',
        description: 'This is a sample description for video 1.',
        views: 1000,
        uploadDate: '2024-01-01',
        thumbnail: '/img/sample1.jpg',
        url: '/video/1'
      },
      {
        id: 2,
        title: 'Sample Video 2',
        description: 'This is a sample description for video 2.',
        views: 2000,
        uploadDate: '2024-02-01',
        thumbnail: '/img/sample2.jpg',
        url: '/video/2'
      },
    ];

    // Set mock data as liked videos
    setLikedVideos(mockLikedVideos);
  }, [userId]);

  return (
    <div>
      <h2>Liked Videos</h2>
      <div className="grid grid-cols-4 gap-5 mt-3">
        {likedVideos.length > 0 ? (
          likedVideos.map(video => (
            <VideoCard 
              key={video.id} 
              id={video.id}
              title={video.title} 
              description={video.description} 
              views={video.views} 
              uploadDate={video.uploadDate} 
              thumbnail={video.thumbnail} 
              url={video.url} 
              isAuthenticated={true} 
              accessToken={accessToken}
            />
          ))
        ) : (
          <p>No liked videos found.</p>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
