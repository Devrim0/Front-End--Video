import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/playlist-card";
import VideoCard from "../components/video-card";
import adsData from "../../ads.json";  // ads.json dosyasını içe aktarıyoruz

interface Video {
  id: number;
  title: string;
  description: string;
  views: number;
  uploadDate: string;
  thumbnail: string;
  url: string;
}

interface Ad {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [ads, setAds] = useState<Ad[]>(adsData);  // JSON dosyasındaki verileri state'e ekliyoruz
  const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyYXNkNEBtYWlsLmNvbSIsImV4cCI6MTcyNTc4MzE3NH0.duJCNmrjM44yRnUpbHnQ-0I2wUJ7K7gouJ1mtBxyKoEMBD6dJ-Y9OT12IqeLMPFXKl3CMVlRCfNukcYoHHwqAw";  // Token'ı burada merkezi olarak tanımlayabilirsiniz

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Token'ı başlık olarak ekliyoruz
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching videos");
      }
      const data = await response.json();
      console.log("Fetched videos:", data);  
      setVideos(data.videos || []);  
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold">Popular Videos</h2>
        <div className="grid grid-cols-4 gap-5 mt-3">
          {videos.length > 0 ? (
            videos.map((video) => (
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
            <p>No videos available</p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="py-10 bg-gray-500 w-full flex items-center justify-center">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div key={ad.id} className="ad-container mx-2">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="object-contain h-24 w-24 mx-2"
                  />
                </a>
              </div>
            ))
          ) : (
            <p>No ads available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
