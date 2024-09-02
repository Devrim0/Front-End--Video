import React from "react";

import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";
import { Play } from "../../../icons";

const PlaylistCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="playlistcard w-full cursor-pointer flex items-center flex-col"
      onClick={() => navigate("/playlist/playlist1")}
    >
      <div className="bg-gray-700 w-[90%] h-[12px] rounded -mb-2"></div>
      <div className="bg-gray-800 w-[95%] h-[12px] rounded -mb-2"></div>
      <AspectRatio
        ratio={4 / 3}
        className="overflow-hidden hover:rounded-none relative"
      >
        <img
          src="/img/view-3d-cinema-film-reel.jpg"
          alt="Image"
          className="rounded-md object-cover"
        />
        <div className="absolute bottom-1 right-1 text-xs bg-black/70 p-1 px-2 rounded font-semibold">
          129 video
        </div>
        <div className="playall absolute top-0 left-0 w-full h-full bg-black/50 ">
          <div className="w-full h-full uppercase gap-3 flex justify-center items-center font-semibold text-lg">
            <Play /> Play All
          </div>
        </div>
      </AspectRatio>
      <div className="w-full text-left">
        <p className="mt-2 font-semibold">Web Design Tutoriol</p>
        <p className="text-sm text-gray-600">Username1 - Oynatma Listesi</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
