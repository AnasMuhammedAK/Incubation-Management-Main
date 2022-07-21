import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Track from "../Components/Track/Track";
import NavBar from "../Components/NavBar/Navbar";

function RecordTrack() {
  const navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem("admin")
    if (admin) {
      navigate("/admin/track")
    } else {
      navigate("/admin/login")
    }
  }, [navigate])
  return (
    <div>
      <NavBar Admin={true} />
      <Track />
    </div>
  );
}

export default RecordTrack;
