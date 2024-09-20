import React from 'react';
import Topbar from "../../components/Topbar.jsx";
import LoginForm from '../../components/forms/LoginForm.jsx';

export default function LoginStudent() {
  return (
    <>
      <Topbar />
      <LoginForm type="student" />
    </>
  )
}
