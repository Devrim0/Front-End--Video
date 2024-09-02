import React, { useEffect } from "react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const handleLogout = async () => {
    try {
        const signoutUrl = 'http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/auth/signout';
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyYXNkNEBtYWlsLmNvbSIsImV4cCI6MTcyNTc4NzI3MH0.ih0PMJvVuwFaAiJ8e5hcp0LE3Gv6Ci_TwwETujmCXhm3x9RPf2lS740VTeZLSnQ75s8Wkw9vC_osGC2tnL7sdQ'; 

        const response = await fetch(signoutUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Bearer token olarak gönderiyoruz
            }
        });

        if (response.ok) {
            // Logout işlemi: localStorage'daki token ve username bilgisini temizle
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            alert('Successfully logged out');
            // Kullanıcıyı profil sayfasına yönlendir
            navigate('/login');
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};

  
  return (
    <header className="border-b">
      <div className="w-full h-full max-width flex justify-between items-center px-5 ">
        <Link to={"/"} className="logo">
          LOGO
        </Link>

        <div className="avatar flex gap-2">
          <div className="search">
            <Input placeholder="Ara" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile/lastvideos")}>
                Last Videos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile/playlists")}>
                Playlists
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile/favourites")}>
                Favourites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
