import { UserButton } from "@clerk/clerk-react";
import React, { FC } from "react";
import { Link, useLocation, useParams, Routes, Route } from "react-router-dom";
import Discover from "../Discov/Discover";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "@clerk/clerk-react";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserGaleree from "../UserGaleree/UserGaleree";

function Dashboard() {
  const userId = useAuth().userId;
  const location = useLocation();
  const { type } = useParams();
  console.log("author ", type);
  console.log(location.pathname);
  return (
    <>
      <NavBar />
    
      {userId === null && !/galeree\/([^\/]+)/.test(location.pathname) ? (
        <Discover />
      ) : (
        <Routes>
          <Route path="/galeree/:author" element={<UserGaleree />} />
        </Routes>
      )}
      {userId !== null  ? <ProfilePage /> : null}
    </>
  );
}

export default Dashboard;
