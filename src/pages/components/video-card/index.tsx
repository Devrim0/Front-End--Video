import React from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  id: number;
  title: string;
  thumbnail: string;
  views: number;
  description: string;
  uploadDate: string;
  url: string;
  isAuthenticated: boolean;
  accessToken: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, thumbnail, views, description, uploadDate, url, isAuthenticated, accessToken }) => {
  return (
    <div className="video-card max-w-sm rounded overflow-hidden shadow-lg bg-gray-900 text-white">
      <Link to={`/video/${id}`} className="block">
        <img className="w-full" src={thumbnail} alt={title} />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
          <p className="text-gray-500 text-xs">{views} views • {uploadDate}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
