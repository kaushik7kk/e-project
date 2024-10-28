import React, { useEffect } from "react";
import Topbar from "../components/Topbar.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Topbar />
      <div>Dashboard</div>
    </>
  );
}
