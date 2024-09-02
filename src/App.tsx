import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "./pages/nopage";
import Layout from "./pages/layout";
import Home from "./pages/home";
import VideoPage from "./pages/videopage";
import PlaylistPage from "./pages/playlistpage";
import { ProfileLayout } from "./pages/profille/profileLayout";
import ProfileHome from "./pages/profille/profilehome";
import ProfilePlaylists from "./pages/profille/profilePlaylists";
import User from "./pages/user";
import UserAuth from "./pages/user"; // İthalat ekleyin

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />{" "}
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="playlist/:name" element={<PlaylistPage />} />
          <Route path="user/:username" element={<User />} />
          <Route path="*" element={<Nopage />} />
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileHome />} />{" "}
          <Route path="playlists" element={<ProfilePlaylists />} />
          <Route path="*" element={<Nopage />} />
        </Route>
          <Route path="*" element={<Nopage />} />
        <Route path="/login" element={<UserAuth />} /> {/* Login rotası eklendi */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
