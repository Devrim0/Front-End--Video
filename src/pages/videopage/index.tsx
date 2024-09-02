import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";
import CommentSection from "../../pages/comment"; // Yorum bileşenini ekliyoruz

interface Video {
  id: number;
  title: string;
  description: string;
  views: number;
  like_count: number;
  dislike_count: number;
  thumbnail: string;
  url: string;
  uploaded_user: {
    uploaded_username: string;
    uploaded_followers_count: number;
  };
}

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyYXNkNEBtYWlsLmNvbSIsImV4cCI6MTcyNTc4MzE3NH0.duJCNmrjM44yRnUpbHnQ-0I2wUJ7K7gouJ1mtBxyKoEMBD6dJ-Y9OT12IqeLMPFXKl3CMVlRCfNukcYoHHwqAw";  // Token

  useEffect(() => {
    if (id) {
      fetchVideo();
      // Tarayıcıda bu videonun daha önce beğenilip beğenilmediğini kontrol et
      const hasLiked = localStorage.getItem(`liked_${id}`);
      if (hasLiked) {
        setLiked(true);
      }
    }
  }, [id]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,  // Token'ı başlık olarak ekliyoruz
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching video");
      }
      const data = await response.json();
      setVideo(data.video);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleLikeVideo = async () => {
    if (!isAuthenticated) {
      alert("Please log in to like this video.");
      return;
    }

    if (liked) {
      alert("You've already liked this video.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos/like/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error liking video");
      }

      // Eğer istek başarılı olursa, beğeni sayısını güncelle ve kalp ikonunu kırmızı yap
      setVideo((prevVideo) => {
        if (prevVideo) {
          return {
            ...prevVideo,
            like_count: prevVideo.like_count + 1,
          };
        }
        return prevVideo;
      });

      setLiked(true);  // Kalp ikonunu kırmızı yapmak için durumu güncelleyin
      localStorage.setItem(`liked_${id}`, "true"); // Bu video için beğeni yapıldığını kaydet
    } catch (error) {
      console.error("Error liking video", error);
    }
  };

  return (
    <div>
      {video ? (
        <div>
          <AspectRatio ratio={16 / 9} className="bg-black">
            <iframe
              width="100%"
              height="100%"
              src={video.url.replace("watch?v=", "embed/")}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
          <div className="py-4">
            <div className="flex w-full justify-between py-2 items-center pr-2">
              <p className="font-semibold text-lg mt-2 capitalize">{video.title}</p>
              <div className="flex gap-3 items-center">
                <Button 
                  variant={"link"} 
                  size={"sm"} 
                  onClick={handleLikeVideo}
                >
                  <Heart size={22} color={liked ? "red" : "currentColor"} />
                </Button>
                <span>{video.like_count} Likes</span>
              </div>
            </div>
            <p className="text-gray-500">{video.description}</p>
            <p className="text-gray-500">Uploaded by: {video.uploaded_user.uploaded_username}</p>
          </div>

          {/* Yorum bileşeni */}
          <CommentSection />
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPage;
