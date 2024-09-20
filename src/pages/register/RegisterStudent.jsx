import React from "react";
import Topbar from "../../components/Topbar.jsx";
import RegisterForm from "../../components/forms/RegisterForm.jsx";

export default function RegisterStudent() {
  return (
    <>
      <Topbar />
      <RegisterForm type="student" />
    </>
  );
}
