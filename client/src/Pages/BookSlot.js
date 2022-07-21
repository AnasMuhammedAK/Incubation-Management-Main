import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../Components/NavBar/Navbar"
import SlotBooking from "../Components/SlotBooking/SlotBooking"

function BookSlot() {
  const navigate = useNavigate
  
  return (
    <div>
      <NavBar Admin={true} />
      <SlotBooking />
    </div>
  );
}

export default BookSlot
