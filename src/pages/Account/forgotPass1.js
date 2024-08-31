import ForgotPass1 from "../../components/forgotPass1";
import "../../css/forgotPass.css";

export default function ForgotPass() {
  return (
    <div className="bg">
      <div className="headtext">
        <h1>Forgot Password</h1>
      </div>
      <div className="modal-bg">
        <ForgotPass1 />
      </div>
    </div>
  );
}
