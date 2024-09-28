import React from "react";
import Toggle from "../components/Toggle";
import Topbar from "../components/Topbar";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {

  return (
    <>
      <Topbar />
      <Toggle />
      <LoginForm />
    </>
  );
}
