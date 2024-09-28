import React from "react";
import "../styles/Toggle.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../store/formReducer";

export default function Toggle() {
  const formType = useSelector((state) => state.form);
  console.log(formType);

  const dispatch = useDispatch();

  const spanClickHandler = (e) => {
    dispatch(toggleForm(e.target.className));
  };

  return (
    <>
      <div className="form-toggle">
        <span className="student" onClick={spanClickHandler}>
          Student
        </span>
        <div className={`toggle-container ${formType}-toggle`}>
          <div className={`toggle-button`} />
        </div>
        <span className="teacher" onClick={spanClickHandler}>
          Teacher
        </span>
      </div>
    </>
  );
}
