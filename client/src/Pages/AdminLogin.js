import React from "react"
import Login from "../Components/Login/Login"

function AdminLogin() {
  return (
    <div>
      <Login Admin={true} />
    </div>
  );
}

export default AdminLogin
