import { Outlet } from "react-router-dom";
import Header from "../components/header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="p-5  max-width" style={{paddingBottom : 70}}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
