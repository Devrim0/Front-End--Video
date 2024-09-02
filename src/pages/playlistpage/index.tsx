import React from "react";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Play } from "../../icons";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

const PlaylistPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex gap-5">
      <div className="w-full p-1 flex-1 ">
        <AspectRatio ratio={4 / 2} className="bg-black"></AspectRatio>
        <div className="py-4">
          <div className="flex w-full justify-between py-2 items-center pr-2">
            <p className="font-semibold text-lg mt-2 capitalize">video</p>
            <div className="flex gap-3">
              <Button variant={"link"} size={"sm"}>
                <Heart size={22} />
              </Button>
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant={"secondary"}
                    className="bg-secondary"
                    size={"sm"}
                  >
                    Add To Playlist
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3"> Add To Playlist</DialogTitle>

                    <div className="flex flex-col gap-3 my-2">
                      <RadioGroup
                        defaultValue="option-one"
                        onChange={(e) => console.log(e)}
                      >
                        <div className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">Playlist One</Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Playlist Two</Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <RadioGroupItem
                            value="option-three"
                            id="option-three"
                          />
                          <Label htmlFor="option-two">New</Label>
                          <Input />
                        </div>
                      </RadioGroup>
                    </div>

                    <Button variant={"secondary"} style={{ marginTop: 15 }}>
                      Add
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <p className="text-gray-600 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla minus
            perspiciatis officia odit eos, quibusdam optio molestiae odio iste
            ipsum asperiores laboriosam sit quo iure quod est distinctio
            obcaecati ex?
          </p>
        </div>
        <div className="">
          <p className="font-semibold py-2 mt-3">Comments</p>
          <div className="flex items-start gap-5 my-5">
            <Avatar>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <Input
              className="w-full border-b"
              style={{
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              placeholder="Add comment..."
            />
          </div>
          <div className="mt-10">
            {Array(10)
              .fill(0)
              .map(() => (
                <div className="flex items-start gap-5 mt-5">
                  <Avatar className="cursor-pointer" onClick={() => navigate("/user/username")}>
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p>
                      @username{" "}
                      <span className="text-gray-500 text-sm">3 saat once</span>
                    </p>
                    <p className="text-gray-600 flex-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit cum, iure voluptates quo molestias facere alias
                      sequi reprehenderit soluta velit.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="py-1" style={{ minWidth: 300 }}>
        <div className="border rounded overflow-scroll h-[400px]">
          <div className="p-5 bg-secondary flex justify-between">
            <p className="font-semibold text-md">{name}</p>
            <p className="text-sm bg-gray-500 hover:bg-gray-600 py-1 px-2 rounded cursor-pointer">Follow</p>
           
          </div>
          <div className="flex flex-col">
            {Array(10)
              .fill(0)
              .map((item, index) => (
                <div className="w-full items-center flex gap-3 cursor-pointer hover:bg-gray-900 p-2">
                  <span className="text-gray-500" style={{ width: 30 }}>
                    {index + 1}
                  </span>
                  <div
                    className="bg-black h-14"
                    style={{ aspectRatio: "3/2" }}
                  ></div>
                  <div className="flex flex-col justify-around h-full w-full overflow-hidden">
                    <p className="font-semibold text-sm">
                      Lorem ipsum dolor sit.
                    </p>
                    <p className="text-gray-500 text-xs">
                      500 views - 3 hour before
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 py-1 mt-5">
          {Array(10)
            .fill(0)
            .map(() => (
              <div className="videocard  w-full flex gap-3 cursor-pointer">
                <div className="bg-black relative h-20 w-full">
                  <div className="playall absolute top-0 left-0 w-full h-full bg-black/50 ">
                    <div className="w-full h-full uppercase gap-3 flex justify-center items-center font-semibold text-sm">
                      <Play /> Play
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around h-full w-full overflow-hidden">
                  <p className="font-semibold text-md">
                    Lorem ipsum dolor sit.
                  </p>
                  <p className="text-gray-500 text-xs">
                    500 views - 3 hour before
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
