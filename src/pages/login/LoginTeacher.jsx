import React from "react";
import Topbar from "../../components/Topbar.jsx";
import LoginForm from "../../components/forms/LoginForm.jsx";

export default function LoginTeacher() {
  return (
    <>
      <Topbar />
      <LoginForm type="teacher" />
    </>
  );
}
