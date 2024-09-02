import { Outlet, useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export function ProfileLayout() {
  const menuler = [
    {
      name: "playlists",
      link: "playlists",
      links: ["playlists", "playlist"],
      submenus: [],
    },
  ];

  const navigate = useNavigate();
  
  // LocalStorage'dan userName'i almak
  const userName = localStorage.getItem('username');
  
  // Kullanıcı bilgilerini saklamak için state
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    document.body.classList.add("dark");

    // API isteği yaparak kullanıcı bilgilerini almak
    const fetchUserData = async () => {
      if (userName) {  // userName'in tanımlı olduğundan emin ol
        try {
          const response = await fetch(`http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/users/${userName}`);
          if (!response.ok) {
            throw new Error("User data could not be fetched");
          }
          const data = await response.json();
          setUser(data.user);  // Gelen kullanıcı bilgilerini state'e kaydedin
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("Username is undefined in localStorage");
      }
    };

    fetchUserData();
  }, [userName]);

  return (
    <>
      <Header />
      <div className="flex flex-col h-full max-width">
        <div className="flex flex-col ">
          <div className="p-4">
            <div className="flex gap-10 items-center">
              <Avatar className="w-20 h-20">
                <AvatarFallback style={{ fontSize: 20 }}>{user?.firstName.charAt(0) ?? "JD"}</AvatarFallback>
              </Avatar>
              <div className="flex gap-10">
                <Dialog>
                  <DialogTrigger>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-lg">4</span>
                      <span className="text-gray-500">Playlists</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      {" "}
                      <DialogTitle className="mb-3"> Playlists</DialogTitle>
                    </DialogHeader>
                    <div className="h-[300px] overflow-scroll ">
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-lg">300</span>
                      <span className="text-gray-500">Followers</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      {" "}
                      <DialogTitle className="mb-3"> Followers</DialogTitle>
                    </DialogHeader>
                    <div className="h-[300px] overflow-scroll ">
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-lg">320</span>
                      <span className="text-gray-500">Following</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      {" "}
                      <DialogTitle className="mb-3"> Following</DialogTitle>
                    </DialogHeader>
                    <div className="h-[300px] overflow-scroll ">
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                      <div className="h-16 bg-black w-full mt-2"></div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <p className="font-semibold mt-3" style={{ fontSize: 27 }}>
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </p>
          </div>

          <div className="flex-1 p-4 pb-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
