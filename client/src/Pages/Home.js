import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../Components/NavBar/Navbar"
import Home from "../Components/Home/Home"

function HomePage() {
  let navigate = useNavigate()
  useEffect(() => {
    let user = localStorage.getItem("user")
    if (user) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [navigate])
  return (
    <div>
      <NavBar />
      <Home />
    </div>
  );
}

export default HomePage