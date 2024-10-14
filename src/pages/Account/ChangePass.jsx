import React from "react";
import { useLocation } from "react-router-dom";
import ChangePass from "../../components/ChangePass";
import "../../css/forgotPass.css";

export default function ChangePassw({ ...beforeLoginSharedProps }) {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="bg-login">
      <div className="headtext">
        <h1>Forgot Password</h1>
      </div>
      <div className="modal-bg">
        <ChangePass email={email} {...beforeLoginSharedProps} />
      </div>
    </div>
  );
}
