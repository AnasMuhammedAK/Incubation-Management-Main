import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/Navbar";
import SideBar from "../Components/SideBar/SideBar";
import DashBoard from "../Components/DashBoard/DashBoard";

function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem("admin");
    if (admin) {
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);
  return (
    <div>
      {/* <SideBar/> */}
      <NavBar Admin={true} />
      <DashBoard />
    </div>
  );
}

export default Admin;
